import { Request, Response, NextFunction } from 'express'
import { UserModel } from '~/models'
import { User } from '~/type'

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { paramSlug } = req.params
    const user = await UserModel.findOne({
      _id: paramSlug
    })
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
  } catch (error) {
    next(error)
  }
}
