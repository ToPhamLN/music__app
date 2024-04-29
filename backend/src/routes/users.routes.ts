import express from 'express'
import {
  getUser,
  updateUser
} from '~/controllers/users.controllers'
import { verifyToken } from '~/middlewares/auth.middlewares'
import uploadCloud from '~/middlewares/uploader'

const route: express.Router = express.Router()

route.get('/:idUser', getUser)
route.put(
  '/update',
  uploadCloud.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'background', maxCount: 1 }
  ]),
  verifyToken,
  updateUser
)

export default route
