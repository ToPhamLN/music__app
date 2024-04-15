import express from 'express'
import {
  createTrack,
  getTrack,
  updateTrack
} from '~/controllers/tracks.controllers'
import { verifyToken } from '~/middlewares/auth.middlewares'
import uploadCloud from '~/middlewares/uploader'

const route: express.Router = express.Router()

route.post(
  '/create',
  verifyToken,
  uploadCloud.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'source', maxCount: 1 }
  ]),
  createTrack
)

route.put(
  '/:idTrack/update',
  verifyToken,
  uploadCloud.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'source', maxCount: 1 }
  ]),
  updateTrack
)

route.get('/:idTrack', getTrack)

export default route
