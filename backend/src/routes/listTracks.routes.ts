import express, {
  NextFunction,
  Request,
  Response
} from 'express'
import { createListTrack } from '~/controllers/listTracks.controller'
import { verifyToken } from '~/middlewares/auth.middlewares'
import uploadCloud from '~/middlewares/uploader'

const route: express.Router = express.Router()
const text = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(200)
    .json({ body: req.body, file: req.files })
  next()
}

route.post(
  '/create',
  verifyToken,
  text,
  uploadCloud.single('photo'),
  createListTrack
)

export default route
