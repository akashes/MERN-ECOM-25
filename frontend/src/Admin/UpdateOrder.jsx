import React, { useEffect, useState } from 'react'
import '../AdminStyles/UpdateOrder.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrderDetails } from '../features/order/orderSlice'
import Loader from '../components/Loader'
import { removeErrors, removeSuccess, updateOrderStatus } from '../features/admin/adminSlice'
import { toast } from 'react-toastify'

const UpdateOrder = () => {
    const {orderId}=useParams()

    //state from order slice
    const{order,loading:orderLoading}=useSelector(state=>state.order)
    const{success,loading:adminLoading,error}=useSelector(state=>state.admin)

    const loading = orderLoading || adminLoading
    console.log(order)
    const dispatch = useDispatch()

    const [status, setStatus] = useState('')

    const handleStatusUpdate = () => {
        if(!status){
            toast.error('Please select a status', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true

        })
        return;
    }
    dispatch(updateOrderStatus({orderId,status}))

}
    useEffect(()=>{
        if(orderId){

            dispatch(getOrderDetails(orderId))
        }

        
    },[dispatch,orderId])

    useEffect(()=>{

        if(error){
            toast.error(error, {
                position: 'top-center',
                autoClose: 3000})
                dispatch(removeErrors())
        }
        if(success){
            toast.success('Order status updated successfully!', {
                position: 'top-center',
                autoClose: 3000
            })
            dispatch(removeSuccess())
                dispatch(getOrderDetails(orderId))
            
        }
    },[dispatch,error,success,orderId])
    const {
        shippingInfo={},
        orderItems=[],
        paymentInfo={},
        orderStatus='',
        totalPrice
       }=order
           const paymentStatus = paymentInfo.status==='succeeded' ? 'Paid' : 'Not Paid'
           const finalOrderStatus = paymentStatus ==='Not Paid'?'Cancelled':orderStatus

  return (
    <>
    <Navbar/>
    <PageTitle title='Update Order' />

{
    loading? <Loader/> : <div className="order-container">
    <h1 className="order-title">Update Order</h1>
    <div className="order-details">
        <h2>Order Information</h2>
        <p><strong>Order ID: </strong>{orderId}</p>
        <p><strong>Shipping Address:</strong>{shippingInfo.address},{shippingInfo.city},{shippingInfo.state},{shippingInfo.pinCode}</p>
        <p><strong>Phone:</strong>{shippingInfo.phoneNo}</p>
        <p><strong>Order Status:</strong>{finalOrderStatus}</p>
        <p><strong>Payment Status:</strong>{paymentStatus}</p>
        <p><strong>Total Price:</strong>{totalPrice}</p>
    </div>
    <div className="order-items">
        <h2>Order Items</h2>    
        <table className="order-table">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
             {
                orderItems.map((item,index)=>(
                       <tr>
                    <td>
                        <img src={item.image} alt="product Image" className='order-item-image' />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}/-</td>
                </tr>
                ))
             }
            </tbody>
        </table>
    </div>
    <div className="order-status">
        <h2>Update Status</h2>
        <select disabled={loading || orderStatus === 'Delivered'}   value={status} onChange={(e)=>setStatus(e.target.value)}  className="status-select">
            <option value="">Select status</option>
            <option value="Shipped">Shipped</option>
            <option value="On The Way">On The Way</option>
            <option value="Delivered">Delivered</option>
        </select>
        <button disabled={!status || loading || orderStatus === 'Delivered' } className="update-button" onClick={handleStatusUpdate}>Update Status</button>

    </div>

</div>
}
    <Footer/>
    </>
  )
}

export default UpdateOrder
