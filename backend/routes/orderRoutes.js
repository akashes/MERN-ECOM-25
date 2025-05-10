import express from 'express'
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js'
import { createOrder, getAllOrders, getMyOrders, getSingleOrder } from '../controller/orderController.js'

const router = express.Router()

router.route('/orders').post(verifyUserAuth,createOrder)
router.route('/admin/orders/:id').get(verifyUserAuth,roleBasedAccess('admin'),getSingleOrder)
router.route('/orders').get(verifyUserAuth,getMyOrders)
router.route('/admin/orders').get(verifyUserAuth,roleBasedAccess('admin'),getAllOrders)
export default router