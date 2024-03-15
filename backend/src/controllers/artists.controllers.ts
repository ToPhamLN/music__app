import { Response, Request, NextFunction } from 'express'
import { ArtistModel } from '~/models'
import { v2 as cloudinary } from 'cloudinary'
import { convertSlug } from '~/utils/helper'

export const createArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.body
    const { _id } = req.auth
    const avatar = req.file

    const existedArtist = await ArtistModel.findOne({
      auth: _id
    })
    if (existedArtist) {
      if (avatar && avatar.filename) {
        await cloudinary.uploader.destroy(avatar.filename)
      }
      return res.status(400).json({
        message: 'Bạn đã có tài khoản nghệ sĩ rồi.'
      })
    }
    const newArtist = new ArtistModel({
      username,
      auth: _id,
      avatar: {
        path: avatar?.path,
        fileName: avatar?.filename
      },
      slug: convertSlug(username)
    })

    const artist = await newArtist.save()
    res.status(200).json({
      artist,
      message: 'Thêm thông tin tài khoản thành công.'
    })
  } catch (error) {
    if (req.file && req.file.filename)
      await cloudinary.uploader.destroy(req.file.filename)
    next(error)
  }
}

export const loginArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authId } = req.params
    console.log(authId)
    const artist = await ArtistModel.findOne({
      auth: authId
    }).select('username avatar _id')

    return res.status(200).json(artist)
  } catch (error) {
    next(error)
  }
}
