import express from 'express'
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js'
import { createOrder, deleteOrder, getAllOrders, getMyOrders, getSingleOrder, updateOrderStatus } from '../controller/orderController.js'

const router = express.Router()

router.route('/orders').post(verifyUserAuth,createOrder)

router.route('/orders/:id')
.get(verifyUserAuth,getSingleOrder)

router.route('/admin/orders/:id')
.put( verifyUserAuth,roleBasedAccess('admin'),updateOrderStatus)
.delete( verifyUserAuth,roleBasedAccess('admin'),deleteOrder)

router.route('/orders').get(verifyUserAuth,getMyOrders)
router.route('/admin/orders').get(verifyUserAuth,roleBasedAccess('admin'),getAllOrders)
export default router