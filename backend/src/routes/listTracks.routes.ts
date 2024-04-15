import express from 'express'
import {
  createListTrack,
  getAlbum,
  getListTracks
} from '~/controllers/listTracks.controller'
import { verifyToken } from '~/middlewares/auth.middlewares'
import uploadCloud from '~/middlewares/uploader'

const route: express.Router = express.Router()

route.post(
  '/create',
  verifyToken,
  uploadCloud.single('photo'),
  createListTrack
)

route.get('/albumsforartist', getListTracks)
route.get('/:idListTrack', getAlbum)

export default route
