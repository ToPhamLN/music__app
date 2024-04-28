import express from 'express'
import {
  getInteraction,
  addWishTrack
} from '~/controllers/interactions.controllers'
import { verifyToken } from '~/middlewares/auth.middlewares'

const route: express.Router = express.Router()

route.get('/:idUser', getInteraction)
route.put('/wish/track/:idTrack', verifyToken, addWishTrack)

export default route
