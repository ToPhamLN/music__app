import { Request, Response, NextFunction } from 'express'
import { FollowingModel } from '~/models'

export const followingAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idRole: userId } = req.auth as { idRole: string }
    const { artistId } = req.body
    let following = await FollowingModel.findOne({
      user: userId
    })
    if (!following) {
      following = new FollowingModel({
        user: userId,
        followedArtists: [artistId]
      })
      await following.save()
      return res
        .status(200)
        .json({ message: 'Đã theo dõi nghệ sĩ thành công.' })
    }
    const isFollowing =
      following.followedArtists.includes(artistId)
    if (isFollowing) {
      await FollowingModel.updateOne(
        { user: userId },
        { $pull: { followedArtists: artistId } }
      )
      return res.status(200).json({
        message: 'Đã hủy theo dõi nghệ sĩ thành công.'
      })
    } else {
      await FollowingModel.updateOne(
        { user: userId },
        { $push: { followedArtists: artistId } }
      )
      return res
        .status(200)
        .json({ message: 'Đã theo dõi nghệ sĩ thành công.' })
    }
  } catch (error) {
    next(error)
  }
}

export const getUserFollowedArtists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const following = await FollowingModel.findOne({
      user: userId
    }).populate('followedArtists')
    const followedArtists = following
      ? following.followedArtists
      : []
    res.status(200).json(followedArtists)
  } catch (error) {
    next(error)
  }
}

export const getArtistFollowers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artistId = req.params.artistId
    const followers = await FollowingModel.find({
      followedArtists: { $in: [artistId] }
    }).populate('user')
    const users = followers
      .map((follower) => follower.user)
      .filter((user) => user)
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}
