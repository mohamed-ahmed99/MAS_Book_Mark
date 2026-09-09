import express from 'express'
import upload from '../middlewares/upload.middleware.js'
import { createAccount, requestedFields } from '../controllers/auth/createAccount.js'
import { login } from '../controllers/auth/login.js'
import { verifyToken } from '../middlewares/verifyToken.middleware.js'

const authRouter = express.Router()


// sign up
authRouter.post('/create_account', upload.fields(requestedFields), createAccount)
// sign in
authRouter.post('/login', login)

// 

export default authRouter