import { ArtistHome } from '~/pages/ArtistHome'
import { Response, Request, NextFunction } from 'express'
import { ArtistModel } from '~/models'
import { v2 as cloudinary } from 'cloudinary'
import { convertSlug } from '~/utils/helper'

export const updateArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: authId } = req.auth as { _id: string }
    const { username, backgroundOld, avatarOld } = req.body
    console.log(req.body, req.files)
    throw new Error('oke')
    const avatar = req.file as Express.Multer.File
    const newArtist: Partial<IArtist> = {
      username
    }
    if (avatar) {
      newArtist.avatar = {
        path: avatar.path,
        fileName: avatar.filename
      }
    }
    const updateArtist = await ArtistModel.findByIdAndUpdate(
      { _id: authId },
      { $set: newArtist }
    )
    res.status(200).json({
      message: 'Tài khoản cập nhật thành công.',
      updateArtist
    })
  } catch (error) {
    next(error)
  }
}

export const getArtists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artist = await ArtistModel.find().lean()
    res.status(200).json(artist)
  } catch (error) {
    next(error)
  }
}

export const getArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idArtist } = req.params
    const artist = await ArtistModel.findById(idArtist).lean()
    res.status(200).json(artist)
  } catch (error) {
    next(error)
  }
}
