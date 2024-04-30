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

export const addRecentlyTrack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idRole } = req.auth as { idRole: string }
    const { idTrack } = req.params as { idTrack: never }
    let interaction = await InteractionModel.findOne({
      user: idRole
    })

    if (!interaction) {
      interaction = new InteractionModel({ user: idRole })
      await interaction.save()
    }

    const index = interaction?.recentlyTrack?.indexOf(idTrack)

    if (index !== -1) {
      interaction.recentlyTrack.splice(index, 1)
    }

    interaction.recentlyTrack.unshift(idTrack)

    if (interaction.recentlyTrack.length > 20) {
      interaction.recentlyTrack.pop()
    }
    await InteractionModel.findOneAndUpdate(
      { user: idRole },
      { $set: { recentlyTrack: interaction.recentlyTrack } },
      { $new: true }
    )

    res.status(200).json({
      message: 'Thêm vào danh sách nghe gần đây thành công'
    })
  } catch (error) {
    next(error)
  }
}

export const addWishListTrack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idRole } = req.auth
    const { idListTrack } = req.params as { idListTrack: never }
    const interaction = await InteractionModel.findOne({
      user: idRole
    })
    const trackLiked =
      interaction?.wishList?.includes(idListTrack)
    if (trackLiked) {
      await InteractionModel.findOneAndUpdate(
        { user: idRole },
        {
          $pull: { wishList: idListTrack }
        },
        { new: true }
      )
      return res.status(200).json({
        message: 'Bỏ thích danh sách thành công!'
      })
    } else {
      await InteractionModel.findOneAndUpdate(
        { user: idRole },
        {
          $push: { wishList: idListTrack }
        },
        { new: true }
      )
      return res.status(200).json({
        message: 'Thích danh sách thành công!'
      })
    }
  } catch (error) {
    next(error)
  }
}
