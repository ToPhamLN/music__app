import express from 'express'
import {
  getInteraction,
  addWishTrack,
  addRecentlyTrack,
  addWishListTrack
} from '~/controllers/interactions.controllers'
import { verifyToken } from '~/middlewares/auth.middlewares'

const route: express.Router = express.Router()

route.get('/:idUser', getInteraction)
route.put('/wish/track/:idTrack', verifyToken, addWishTrack)
route.put(
  '/recently/track/:idTrack',
  verifyToken,
  addRecentlyTrack
)
route.put(
  '/wish/listtrack/:idListTrack',
  verifyToken,
  addWishListTrack
)

export default route
