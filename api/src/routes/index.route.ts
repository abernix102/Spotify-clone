import expres from 'express'
// import { login } from '../controllers/login.controller'
import { auth, callback } from '../controllers/auth.controller'
import { refreshToken } from '../controllers/refresh_token.controller'

export const router = expres.Router()

router
.get('/auth', auth)
.get('/auth/callback', callback)
.get('/auth/refresh_token', refreshToken)
