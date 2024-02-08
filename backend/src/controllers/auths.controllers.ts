import { Request, Response, NextFunction } from 'express'
import { AuthModel, UserModel, ArtistModel } from '~/models'
import {
  generateAccessToken,
  generateRefreshToken,
  convertSlug
} from '~/utils/helper'
import bcrypt from 'bcrypt'
import { Auth } from '~/type'

export const postSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { email, username, password } = req.body
    const existAuth = await AuthModel.findOne({
      $or: [{ email: email }, { username: username }]
    })

    if (existAuth) {
      return res.status(400).json({
        message: 'User account already exists'
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    const newAuth = new AuthModel({
      username: username,
      email: email,
      password: hashed
    })
    const newUser = new UserModel({
      name: username,
      slug: convertSlug(username)
    })
    const newArtist = new ArtistModel({
      name: username,
      slug: convertSlug(username)
    })
    const auth = await newAuth.save()
    await newUser.save()
    await newArtist.save()
    res.status(200).json(auth)
  } catch (error) {
    next(error)
  }
}
export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { username, password } = req.body
    const auth = await AuthModel.findOne({
      username: username
    })
    if (!auth) {
      return res.status(404).json({
        message: 'User not found, Please try again!'
      })
    }
    const validPassword = await bcrypt.compare(
      password,
      auth.password
    )
    if (!validPassword) {
      return res.status(404).json({
        message: 'Wrong password, please try again!'
      })
    }
    if (auth && validPassword) {
      const accessToken = generateAccessToken(auth)
      const refreshToken = generateRefreshToken(auth)
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict'
      })
      const { password, ...others } = auth
      res
        .status(200)
        .json({ ...others, accessToken, refreshToken })
    }
  } catch (error) {
    next(error)
  }
}

export const updateAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { username, email, oldPassword, newPassword } =
      req.body
    const auth: Auth = req.auth

    const existedAuth = await AuthModel.findOne({
      $or: [
        { email: email || auth.email },
        { username: username || auth.username }
      ],
      _id: { $ne: auth._id }
    })

    if (existedAuth) {
      return res.status(400).json({
        message: 'User already existed'
      })
    }

    if (oldPassword) {
      const validPassword = await bcrypt.compare(
        oldPassword,
        auth.password
      )
      if (!validPassword) {
        return res.status(401).json({
          message: 'Wrong password, please try again!'
        })
      }
    }

    const newAuth: {
      username: string
      email: string
      password?: string
    } = {
      username: username || auth.username,
      email: email || auth.email
    }

    if (newPassword) {
      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(newPassword, salt)
      newAuth.password = hashed
    }

    const result = await AuthModel.updateOne(
      { _id: auth._id },
      { $set: newAuth }
    )

    res.status(200).json({
      message: 'Auth account updated successfully',
      result: result
    })
  } catch (error) {
    next(error)
  }
}
