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

export const getSingleOrder=handleAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate('user','name email')
    if(!order){
        return next(new handleError('Order not found',404))
    }
    res.status(200).json({
        success:true,
        order
    })
})

//get all orders of the logged in user
export const getMyOrders=handleAsyncError(async(req,res,next)=>{
  const orders=  await Order.find({user:req.user.id}).sort({createdAt:-1})
  if(!orders){
    return next(new handleError('Orders not found',404))
  }
  res.status(200).json({
    success:true,
    orders
    
  })
})

//get all orders
export const getAllOrders=handleAsyncError(async(req,res,next)=>{
  const orders=  await Order.find()
  const total = orders.reduce((acc,item)=>item.totalPrice+acc,0)
  console.log('total order amount',total)
  if(!orders){
    return next(new handleError('Orders not found',404))
  }
  res.status(200).json({
    success:true,
    orders,
    total
    
  })
})

//update order status

export const updateOrderStatus= handleAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new handleError('Order not found',404))
    }
    if(order.orderStatus==='Delivered'){
        return next(new handleError('You have already delivered this order',400))
    }
     // Only update stock when status is Shipped or Delivered
  if (req.body.status === 'Shipped' || req.body.status === 'Delivered') {
    await Promise.all(
      order.orderItems.map((item) =>
        updateStock(item.product, item.quantity)
      )
    );
  }
    
    order.orderStatus = req.body.status
    //adding deliveredAt only if status is delivered
    if(req.body.status === 'Delivered'){
        order.deliveredAt = Date.now()
    }
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        order
    })
})

async function updateStock(productId,quantity){
    const product = await Product.findById(productId)
    if(!product){
        throw new Error('Product not found')
    }
    product.stock -= quantity
    await product.save({validateBeforeSave:false})
}

export const deleteOrder=handleAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new handleError('Order not found',404))
    }
    if(order.orderStatus !== 'Delivered'){
        return next(new handleError('Order under Processing , cannot be deleted',400))
    }
    await order.deleteOne({_id:req.params.id})
    res.status(200).json({
        success:true,
        message:'Order deleted successfully'
    })
})