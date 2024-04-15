import { v2 as cloudinary } from 'cloudinary'
import { Request, Response, NextFunction } from 'express'
import { ArtistModel, ListTrackModel } from '~/models'
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
    const { title, description, category, background, genre } =
      req.body
    const { idRole, role } = req.auth
    const photo = req.file

    const newListTrack = new ListTrackModel({
      description,
      category,
      background,
      title,
      genre,
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

export const listensListTrack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idListTrack } = req.params
    const existedListTrack =
      await ListTrackModel.findById(idListTrack)
    if (!existedListTrack)
      return res
        .status(404)
        .json({ message: 'Không tìm thấy danh sách này' })
    await ListTrackModel.updateOne(
      { _id: idListTrack },
      { $inc: { listens: 1 } }
    )
    res
      .status(200)
      .json({ message: 'Tăng lượt nghe thành công' })
  } catch (error) {
    next(error)
  }
}

export const likesListTrack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idRole } = req.auth as { idRole: never }
    const { idListTrack } = req.params
    const existedListTrack =
      await ListTrackModel.findById(idListTrack)
    if (!existedListTrack)
      return res
        .status(404)
        .json({ message: 'Không tìm thấy danh sách này' })
    const userLiked = existedListTrack.likes.includes(idRole)
    if (userLiked) {
      await ListTrackModel.findByIdAndUpdate(
        idListTrack,
        {
          $pull: { likes: idRole }
        },
        { new: true }
      )
      return res.status(200).json({
        message: 'Bỏ thích bài hát thành công!'
      })
    } else {
      await ListTrackModel.findByIdAndUpdate(
        idListTrack,
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

export const getListTracks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { author } = req.query as { author: string }
    const query: { author?: string } = {}

    if (author) {
      query.author = author
    }
    const listTracks = await ListTrackModel.find(query)
      .populate({
        path: 'author',
        select: 'username _id avatar slug'
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
    const { idListTrack } = req.params
    const listTrack = await ListTrackModel.findById(idListTrack)
      .populate({
        path: 'author',
        select: 'username _id avatar slug'
      })
      .populate({
        path: 'list',
        populate: {
          path: 'artist album',
          select: '_id username title slug avatar'
        }
      })

      .lean()

    res.status(200).json(listTrack)
  } catch (error) {
    next(error)
  }
}
