import express from 'express'
import {
  createArtist,
  loginArtist
} from '~/controllers/artists.controllers'
import { verifyToken } from '~/middlewares/auth.middlewares'
import uploadCloud from '~/middlewares/uploader'

const route: express.Router = express.Router()

route.post(
  '/create',
  verifyToken,
  uploadCloud.single('avatar'),
  createArtist
)

route.get('/login/:authId', loginArtist)

export default route
