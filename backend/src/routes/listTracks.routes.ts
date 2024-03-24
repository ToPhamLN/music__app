import express from 'express'
import {
  createListTrack,
  getAlbum,
  getAlbums
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

route.get('/albumsforartist', verifyToken, getAlbums)
route.get('/albumforartist/:listTrackParam', getAlbum)

export default route
