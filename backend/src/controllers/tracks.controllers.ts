import { Request, Response, NextFunction } from 'express'
import {
  TrackModel,
  ListTrackModel,
  ArtistModel
} from '~/models'
import { v2 as cloudinary } from 'cloudinary'
import { convertSlug } from '~/utils/helper'
import { createMonthlyListens } from './monthlyListens.controller'
import { EListens } from '~/types'

const destroyFile = async (fileName?: string) => {
  if (fileName) await cloudinary.uploader.destroy(fileName)
}

interface IReqFiles {
  photo: Express.Multer.File[] | []
  source: Express.Multer.File[] | []
}

interface IReqBody {
  album?: string
  title?: string
  lyrics?: string
  duration?: number
  artist?: string
  photoOld: string
  sourceOld: string
}

export const createTrack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { album, title, lyrics, duration, artist } =
      req.body as IReqBody
    const { photo, source } = req.files as unknown as IReqFiles

    const { idRole, role } = req.auth
    const convertArtist = artist ? JSON.parse(artist) : []
    const convertAlbum = album ? JSON.parse(album) : undefined

    const newTrack = new TrackModel({
      album: convertAlbum?._id,
      title,
      lyrics,
      duration,
      artist: convertArtist,
      slug: title && convertSlug(title),
      author: idRole,
      authorRole: role
    })

    const setPhoto =
      photo && photo[0]?.filename
        ? { path: photo[0].path, fileName: photo[0].fieldname }
        : {}

    const setSource =
      source && source[0]?.filename
        ? {
            path: source[0].path,
            fileName: source[0].fieldname
          }
        : {}

    newTrack.photo = setPhoto
    newTrack.source = setSource

    const track = await newTrack.save()
    await ListTrackModel.findByIdAndUpdate(convertAlbum?._id, {
      $push: {
        list: track._id
      }
    })
    res
      .status(201)
      .json({ message: 'Đã thêm bài hát thành công' })
  } catch (error) {
    if (req.file) {
      const { photo, source } = req.files as unknown as IReqFiles
      if (photo && photo[0])
        await cloudinary.uploader.destroy(photo[0]?.filename)
      if (source && source[0])
        await cloudinary.uploader.destroy(source[0]?.filename)
    }
    next(error)
  }
}

export const updateTrack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idTrack } = req.params

    const existedTrack =
      await TrackModel.findById(idTrack).lean()
    if (!existedTrack)
      throw new Error('Không tìm thấy bài hát này')

    const {
      album,
      title,
      lyrics,
      duration,
      artist,
      photoOld,
      sourceOld
    } = req.body as IReqBody

    const { photo, source } = req.files as unknown as IReqFiles

    const convertPhoto = photoOld ? JSON.parse(photoOld) : {}
    const convertSource = sourceOld ? JSON.parse(sourceOld) : {}
    const converArtist = artist ? JSON.parse(artist) : []
    const convertAlbum = album ? JSON.parse(album) : undefined

    const newTrack: Partial<ITrack> = {
      album: convertAlbum?._id,
      title,
      lyrics,
      duration,
      artist: converArtist
    }

    const setPhoto =
      photo && photo[0]?.filename
        ? { path: photo[0].path, fileName: photo[0].fieldname }
        : convertPhoto

    const setSource =
      source && source[0]?.filename
        ? { path: source[0].path, fileName: source[0].fieldname }
        : convertSource

    newTrack.photo = setPhoto
    newTrack.source = setSource

    const updateTrack = await TrackModel.findOneAndUpdate(
      { _id: idTrack },
      { $set: newTrack },
      { new: true }
    )

    if (!updateTrack) throw new Error('Không thể cập nhập')

    await Promise.all([
      destroyFile(
        convertPhoto.fileName || existedTrack?.photo?.fileName
      ),
      destroyFile(
        convertSource.fileName || existedTrack?.source?.fileName
      )
    ])

    res.status(200).json({
      message: 'Cập nhập bài hát thành công.',
      updateTrack
    })
  } catch (error) {
    if (req.files) {
      const { photo, source } = req.files as unknown as IReqFiles
      await Promise.all([
        destroyFile(photo && photo[0]?.filename),
        destroyFile(source && source[0]?.filename)
      ])
    }
    next(error)
  }
}

export const listensTrack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idTrack } = req.params
    const { listInfo } = req.body as { listInfo: never }

    const foundTrack = await TrackModel.findById(idTrack).lean()

    if (!foundTrack) {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy bài hát này!' })
    }

    await increaseListens(foundTrack, listInfo)

    return res
      .status(201)
      .json({ message: 'Tăng lượt nghe thành công!' })
  } catch (error) {
    next(error)
  }
}

export const deleteTrack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idTrack } = req.params
    const existedTrack = await TrackModel.findById(idTrack)
    if (!existedTrack) {
      return res.status(404).json({
        message: 'Bạn đã xóa bài hát này rồi!'
      })
    }
    await TrackModel.findByIdAndDelete(idTrack)
    if (existedTrack?.photo?.fileName)
      await cloudinary.uploader.destroy(
        existedTrack?.photo?.fileName
      )
    res.status(200).json({ message: 'Xóa bài hát thành công!' })
  } catch (error) {
    next(error)
  }
}

export const getTrack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idTrack } = req.params
    const track = await TrackModel.findById(idTrack)
      .populate({
        path: 'album',
        select: '_id title slug'
      })
      .populate({
        path: 'artist author',
        select: '_id username slug avatar'
      })
      .exec()
    res.status(200).json(track)
  } catch (error) {
    next(error)
  }
}

export const getTracks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { author, q } = req.query as {
      author: string
      q: string
    }

    const query = {} as {
      author?: string
      slug: {
        $regex: RegExp
      }
    }
    if (author) query.author = author
    if (q)
      query.slug = {
        $regex: new RegExp(convertSlug(q), 'i')
      }

    const tracks = await TrackModel.find(query)
      .populate({
        path: 'album',
        select: '_id title slug'
      })
      .populate({
        path: 'artist author',
        select: '_id username slug avatar'
      })
      .exec()

    res.status(200).json(tracks)
  } catch (error) {
    next(error)
  }
}

async function increaseListens(
  track: ITrack,
  listInfo?: string
) {
  const today = new Date()
  const month = today.getMonth() + 1
  const year = today.getFullYear()
  const listTrackIds = [
    track.album as unknown as string
  ] as string[]
  const artistIds = [
    track.author as unknown as string,
    ...track.artist
  ] as string[]

  if (listInfo && listInfo !== String(track.album)) {
    listTrackIds.push(listInfo)
  }
  await TrackModel.updateOne(
    { _id: track._id },
    { $inc: { listens: 1 } }
  )
  await createMonthlyListens(
    track.id,
    EListens.TRACK,
    month,
    year,
    1
  )

  for (const listTrackId of listTrackIds) {
    await ListTrackModel.updateOne(
      { _id: listTrackId },
      { $inc: { listens: 1 } }
    )
    await createMonthlyListens(
      listTrackId,
      EListens.LISTTRACK,
      month,
      year,
      1
    )
  }

  for (const artistId of artistIds) {
    await ArtistModel.updateOne(
      { _id: artistId },
      { $inc: { listens: 1 } }
    )
    await createMonthlyListens(
      artistId,
      EListens.ARTIST,
      month,
      year,
      1
    )
  }
}
