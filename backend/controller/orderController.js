import handleAsyncError from '../middleware/handleAsyncError.js'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'
import handleError from '../utlis/handleError.js'

export const createOrder=handleAsyncError(async(req,res,next)=>{
    const{shippingInfo,orderItems,paymentInfo,itemPrice,taxPrice,shippingPrice,totalPrice}=req.body
    

   const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user.id


    })
    res.status(201).json({
        success:true,
        order
    })
    
})