import { InteractionModel } from '~/models'
import { Request, Response, NextFunction } from 'express'

export const getInteraction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idUser } = req.params
    let interaction = await InteractionModel.findOne({
      user: idUser
    })
    if (!interaction) {
      interaction = new InteractionModel({ user: idUser })
      await interaction.save()
    }
    res.status(200).json(interaction)
  } catch (error) {
    next(error)
  }
}

export const addWishTrack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idRole } = req.auth
    const { idTrack } = req.params as { idTrack: never }
    const interaction = await InteractionModel.findOne({
      user: idRole
    })
    const trackLiked = interaction?.wishTrack?.includes(idTrack)
    if (trackLiked) {
      await InteractionModel.findOneAndUpdate(
        { user: idRole },
        {
          $pull: { wishTrack: idTrack }
        },
        { new: true }
      )
      return res.status(200).json({
        message: 'Bỏ thích bài hát thành công!'
      })
    } else {
      await InteractionModel.findOneAndUpdate(
        { user: idRole },
        {
          $push: { wishTrack: idTrack }
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
