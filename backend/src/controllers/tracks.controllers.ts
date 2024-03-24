import { Request, Response, NextFunction } from 'express'
import { TrackModel } from '~/models'
import { v2 as cloudinary } from 'cloudinary'
import { convertSlug } from '~/utils/helper'

export const createTrack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { album, title, lyrics, duration, artist } = req.body
    const { idRole, role } = req.auth
    const newTrack = new TrackModel({
      album,
      title,
      lyrics,
      duration,
      artist: [idRole, ...artist],
      slug: convertSlug(title),
      author: idRole,
      authorRole: role
    })
    if (req.file) {
      const { photo, source } = req.files as {
        photo: Express.Multer.File[] | []
        source: Express.Multer.File[] | []
      }
      if (photo) {
        newTrack.photo = {
          path: photo[0]?.path,
          fileName: photo[0].fieldname
        }
      }
      if (source) {
        newTrack.photo = {
          path: source[0]?.path,
          fileName: source[0].fieldname
        }
      }
    }
    await newTrack.save()
    res
      .status(201)
      .json({ message: 'Đã thêm bài hát thành công' })
  } catch (error) {
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
    const {
      album,
      title,
      lyrics,
      duration,
      artist,
      author
    }: ITrack = req.body
    const { idRole } = req.auth
    const existedTrack =
      await TrackModel.findById(idTrack).lean()
    if (!existedTrack)
      return res.status(404).json({
        message: 'Không tìm thấy bài hát này!'
      })
    const newTrack: Partial<ITrack> = {
      album: album ? album : existedTrack.album,
      title: title ? title : existedTrack.title,
      lyrics: lyrics ? lyrics : existedTrack.lyrics,
      duration: duration ? duration : existedTrack.duration,
      artist: author ? [idRole, ...artist] : existedTrack.artist
    }
    if (req.file) {
      const { photo, source } = req.files as {
        photo: Express.Multer.File[] | []
        source: Express.Multer.File[] | []
      }
      if (photo) {
        newTrack.photo = {
          path: photo[0]?.path,
          fileName: photo[0].fieldname
        }
      }
      if (source) {
        newTrack.photo = {
          path: source[0]?.path,
          fileName: source[0].fieldname
        }
      }
    }
    const updateTrack = await TrackModel.updateOne(
      { _id: idTrack },
      { $set: newTrack }
    )
    res.status(200).json({
      message: 'Tài khoản bài hát thành công.',
      updateTrack
    })
  } catch (error) {
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
    const existedTrack =
      await TrackModel.findById(idTrack).lean()
    if (!existedTrack)
      return res.status(404).json({
        message: 'Không tìm thấy bài hát này!'
      })

    await TrackModel.updateOne(
      { _id: idTrack },
      { $inc: { listens: 1 } }
    )

    res.status(201).json({
      message: 'Tăng lượt nghe thành công!'
    })
  } catch (error) {
    next(error)
  }
}

export const likesTrack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idRole } = req.auth as { idRole: never }
    const { idTrack } = req.params
    const existedTrack =
      await TrackModel.findById(idTrack).lean()
    if (!existedTrack) {
      return res.status(404).json({
        message: 'Không tìm thấy bài hát này!'
      })
    }
    const userLiked = existedTrack.likes.includes(idRole)

    if (userLiked) {
      await TrackModel.findByIdAndUpdate(
        idTrack,
        {
          $pull: { likes: idRole }
        },
        { new: true }
      )
      return res.status(200).json({
        message: 'Bỏ thích bài hát thành công!'
      })
    } else {
      await TrackModel.findByIdAndUpdate(
        idTrack,
        {
          $push: { likes: idRole }
        },
        { new: true }
      )
      return res.status(200).json({
        message: 'Thích bài hát thành công!'
      })
    }
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
        message: 'bạn đã xóa bài hát này rồi.'
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
