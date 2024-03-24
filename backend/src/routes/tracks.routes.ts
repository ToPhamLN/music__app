import { create } from 'domain'
import express from 'express'
import { createTrack } from '~/controllers/tracks.controllers'
import { verifyToken } from '~/middlewares/auth.middlewares'
const route: express.Router = express.Router()

route.post('/track/create', verifyToken, createTrack)

export default route
