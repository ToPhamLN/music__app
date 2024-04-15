import { Request, Response, NextFunction } from 'express'
import { TrackModel, ListTrackModel } from '~/models'
import { v2 as cloudinary } from 'cloudinary'
import { convertSlug } from '~/utils/helper'

interface IUpload {
  photo: Express.Multer.File[] | []
  source: Express.Multer.File[] | []
}

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
      artist: artist ? [idRole, ...artist] : [idRole],
      slug: convertSlug(title),
      author: idRole,
      authorRole: role
    })

    if (req.files) {
      const { photo, source } = req.files as unknown as IUpload
      if (photo) {
        newTrack.photo = {
          path: photo[0]?.path,
          fileName: photo[0].fieldname
        }
      }
      if (source) {
        newTrack.source = {
          path: source[0]?.path,
          fileName: source[0].fieldname
        }
      }
    }
    const track = await newTrack.save()
    await ListTrackModel.findByIdAndUpdate(album, {
      $push: {
        list: track._id
      }
    })
    res
      .status(201)
      .json({ message: 'Đã thêm bài hát thành công' })
  } catch (error) {
    if (req.files) {
      const { photo, source } = req.files as unknown as IUpload
      await cloudinary.uploader.destroy(photo[0]?.filename)
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
    const { album, title, lyrics, duration, artist }: ITrack =
      req.body
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
      artist: artist ? [idRole, ...artist] : [idRole]
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
      .populate({ path: 'artist', select: '_id username slug' })
      .exec()
    res.status(200).json(track)
  } catch (error) {
    next(error)
  }
}
