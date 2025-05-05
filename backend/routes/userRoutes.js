import express from 'express'
import { loginUser, logout, registerUser, resetPassword } from '../controller/userController.js'
import { verifyUserAuth } from '../middleware/userAuth.js'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logout) 
router.route('/reset').post(verifyUserAuth,resetPassword)

export default router