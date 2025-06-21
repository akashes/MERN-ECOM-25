import express from 'express'
import { verifyUserAuth } from '../middleware/userAuth.js'
import { processPayment } from '../controller/paymentController.js'

const router = express.Router()

router.route('/payment/process').post(verifyUserAuth,processPayment)


export default router