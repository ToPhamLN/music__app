import { v2 as cloudinary } from 'cloudinary'
import { Request, Response, NextFunction } from 'express'
import { ListTrackModel } from '~/models'
import { convertSlug } from '~/utils/helper'

export const createListTrack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, category } = req.body
    // const { photo, background } = req.files
    return res.status(200).json('true')
    const newListTrack = new ListTrackModel({
      title,
      description,
      category,
      slug: convertSlug(title)
    })
    if (photo) {
      newListTrack.photo = {
        path: photo.path,
        fileName: photo.fileName
      }
    }
    if (background) {
      newListTrack.background = {
        path: background.path,
        fileName: background.filename
      }
    }
    const listTrack = await newListTrack.save()
    res
      .status(200)
      .json({ listTrack, message: 'Tạo thành công' })
  } catch (error) {
    next(error)
  }
}
