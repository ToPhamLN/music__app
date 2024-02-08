import express from 'express'
import {
  postLogin,
  postSignup,
  updateAuth
} from '~/controllers/auths.controllers'
import { verifyToken } from '~/middlewares/auth.middlewares'

const router: express.Router = express.Router()

router.post('/login', postLogin)
router.post('/signup', postSignup)
router.put('/update', verifyToken, updateAuth)

export default router
