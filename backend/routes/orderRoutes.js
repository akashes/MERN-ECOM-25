import express from 'express'
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js'
import { createOrder, getSingleOrder } from '../controller/orderController.js'

const router = express.Router()

router.route('/orders').post(verifyUserAuth,createOrder)
router.route('/admin/orders/:id').get(verifyUserAuth,roleBasedAccess('admin'),getSingleOrder)

export default router