import jwt, { VerifyErrors } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { AuthModel } from '~/models'

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token: string | undefined = req.headers.token as string

  if (token) {
    const accessToken = token.split(' ')[1]

    jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_KEY as string,
      async (err: VerifyErrors | null, auth: any) => {
        if (err) {
          res.status(403).json({
            message: 'Token is not valid'
          })
        }

        try {
          const existed = await AuthModel.findById(auth?.authID)

          if (auth && !existed) {
            res.status(403).json({
              message: 'User is not valid'
            })
          }

          req.auth = existed
          next()
        } catch (error) {
          next(error)
        }
      }
    )
  } else {
    res.status(401).json({
      message: "You're not authenticated!"
    })
  }
}
