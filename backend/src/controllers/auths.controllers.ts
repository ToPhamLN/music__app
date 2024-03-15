import { Request, Response, NextFunction } from 'express'
import { AuthModel } from '~/models'
import {
  generateAccessToken,
  generateRefreshToken
} from '~/utils/helper'
import bcrypt from 'bcrypt'
import { Auth } from '~/type'

export const postSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const existAuth = await AuthModel.findOne({ email })

    if (existAuth) {
      return res
        .status(400)
        .json({ message: 'Email này đã tồn tại' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    const newAuth = new AuthModel({ email, password: hashed })
    const auth = await newAuth.save()
    const { password: omitPassword, ...other } = auth.toObject()
    const accessToken = generateAccessToken(auth)
    const refreshToken = generateRefreshToken(auth)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'strict'
    })

    res.status(200).json({
      auth: { ...other, accessToken },
      message: 'Đăng ký thành công'
    })
  } catch (error) {
    next(error)
  }
}

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body
    const auth = await AuthModel.findOne({ username }).lean()

    if (!auth) {
      return res.status(404).json({
        message:
          'Không tìm thấy tài khoản này! Vui lòng thử lại.'
      })
    }

    const validPassword = await bcrypt.compare(
      password,
      auth.password
    )

    if (!validPassword) {
      return res
        .status(404)
        .json({ message: 'Sai mật khẩu!. Vui lòng thử lại.' })
    }

    const { password: omitPassword, ...others } = auth
    const accessToken = generateAccessToken(auth)
    const refreshToken = generateRefreshToken(auth)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'strict'
    })

    res.status(200).json({
      auth: { ...others, accessToken },
      message: 'Đăng nhập thành công'
    })
  } catch (error) {
    next(error)
  }
}

export const updateAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, oldPassword, newPassword, role } = req.body
    const auth: Auth = req.auth

    if (email) {
      const existedAuth = await AuthModel.findOne({
        email,
        _id: { $ne: auth._id }
      })

      if (existedAuth) {
        return res
          .status(400)
          .json({ message: 'Tài khoản này đã tồn tại.' })
      }
    }

    const newAuth: Partial<Auth> = {
      email: email || auth.email,
      role: role || auth.role
    }
    if (oldPassword && newPassword) {
      const validPassword = await bcrypt.compare(
        oldPassword,
        auth.password
      )

      if (!validPassword) {
        return res.status(401).json({
          message: 'Sai mật khẩu cũ! Vui lòng thử lại.'
        })
      }
      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(newPassword, salt)
      newAuth.password = hashed
    }

    const result = await AuthModel.updateOne(
      { _id: auth._id },
      { $set: newAuth }
    )

    res.status(200).json({
      message: 'Tài khoản cập nhật thành công.',
      result
    })
  } catch (error) {
    next(error)
  }
}
