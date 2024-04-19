import { Response, Request, NextFunction } from 'express'
import { ArtistModel } from '~/models'
import { v2 as cloudinary } from 'cloudinary'

interface IReqFiles {
  avatar?: Express.Multer.File[] | []
  background?: Express.Multer.File[] | []
}

interface IReqBody {
  username?: string
  backgroundOld?: string
  avatarOld?: string
}

export const updateArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idRole: artistId } = req.auth as { idRole: string }
    const exstedArtist = await ArtistModel.findById(artistId)
    if (!exstedArtist)
      throw new Error('Không tìm thấy nghệ sĩ này')

    const { username, backgroundOld, avatarOld } =
      req.body as IReqBody
    const { avatar, background } =
      req.files as unknown as IReqFiles
    let convertBackground: IImage = {}
    let convertAvatar: IImage = {}
    if (backgroundOld) {
      convertBackground = JSON.parse(backgroundOld)
    }
    if (avatarOld) {
      convertAvatar = JSON.parse(avatarOld)
    }

    const newArtist: Partial<IArtist> = {
      username: username
    }
    if (avatar && avatar[0]?.filename) {
      newArtist.avatar = {
        path: avatar[0]?.path,
        fileName: avatar[0]?.filename
      }
    } else {
      newArtist.avatar = convertAvatar
    }
    if (background && background[0]?.filename) {
      newArtist.background = {
        path: background[0]?.path,
        fileName: background[0]?.filename
      }
    } else {
      newArtist.background = convertBackground
    }

    const updateArtist = await ArtistModel.findByIdAndUpdate(
      artistId,
      { $set: newArtist },
      { new: true }
    )
    if (!updateArtist) {
      throw new Error('Không thể cập nhập.')
    }
    if (
      !convertAvatar?.fileName &&
      exstedArtist?.avatar?.fileName
    )
      await cloudinary.uploader.destroy(
        exstedArtist?.avatar?.fileName
      )
    if (
      !convertBackground?.fileName &&
      exstedArtist?.background?.fileName
    )
      await cloudinary.uploader.destroy(
        exstedArtist?.background?.fileName
      )

    res.status(201).json({
      message: 'Cập nhập thành công',
      artist: updateArtist
    })
  } catch (error) {
    if (req.file) {
      const { avatar, background } =
        req.files as unknown as IReqFiles
      if (avatar) {
        await cloudinary.uploader.destroy(avatar[0]?.filename)
      }
      if (background) {
        await cloudinary.uploader.destroy(
          background[0]?.filename
        )
      }
    }

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
