import { v2 as cloudinary } from 'cloudinary'
import { Request, Response, NextFunction } from 'express'
import { ListTrackModel } from '~/models'
import { convertSlug } from '~/utils/helper'
interface IUploadFile {
  photo?: Express.Multer.File[]
  background?: Express.Multer.File[]
}

export const createListTrack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, category, background } = req.body
    const { idRole, role } = req.auth
    const photo = req.file

    const newListTrack = new ListTrackModel({
      description,
      category,
      background,
      title,
      author: idRole,
      authorRole: role,
      slug: convertSlug(title)
    })
    if (photo) {
      newListTrack.photo = {
        path: photo.path,
        fileName: photo.filename
      }
    }
    const listTrack = await newListTrack.save()
    res
      .status(200)
      .json({ listTrack, message: 'Tạo thành công' })
  } catch (error) {
    if (req.file && req.file.filename)
      await cloudinary.uploader.destroy(req.file.filename)
    next(error)
  }
}

export const getAlbums = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idRole } = req.auth
    const listTracks = await ListTrackModel.find({
      author: idRole
    })
      .populate({
        path: 'author',
        select: 'username _id avatar'
      })
      .lean()
    res.status(200).json(listTracks)
  } catch (error) {
    next(error)
  }
}

export const getAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { listTrackParam } = req.params
    const listTrack =
      await ListTrackModel.findById(listTrackParam).lean()
    res.status(200).json(listTrack)
  } catch (error) {
    next(error)
  }
}
