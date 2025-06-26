import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, removeErrors } from '../features/order/orderSlice'
import { useParams } from 'react-router-dom'
import '../OrderStyles/orderDetails.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
const OrderDetails = () => {
    
    const {orderId} = useParams()


    const{order,loading,error}=useSelector(state=>state.order)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getOrderDetails(orderId))

        if(error){
            toast.error(error,{position:'top-center',autoClose:3000})
            dispatch(removeErrors())
        }
    },[dispatch,error,orderId])
    console.log(order)
    const{
        shippingInfo={},
        orderItems=[],
        paymentInfo={},
        orderStatus,
        totalPrice,
        taxPrice,
        shippingPrice,
        itemsPrice,
        paidAt



    }=order

    const paymentStatus = paymentInfo?.status==='succeeded' ? 'PAID' : 'Not Paid'
    const finalOrderStatus = paymentStatus === 'Not Paid' ? 'cancelled' : orderStatus

    const orderStatusClass = finalOrderStatus==='Delivered'?'status-tag delivered':`status-tag ${finalOrderStatus.toLowerCase()}`
    const paymentStatusClass = `pay-tag ${paymentStatus==='paid'?'paid':'not-paid'}`
  
  return (

    <>
    <PageTitle title={orderId}/>
    <Navbar/>
   {
    loading ? <Loader/> :   <div className="order-box">
        {/* order items table */}
        <div className="table-block">
            <h2 className="table-title">
                Order Items
            </h2>
                <table className="table-main">
                    <thead>
                        <tr>
                            <th className="head-cell">Image</th>
                            <th className="head-cell">Name</th>
                            <th className="head-cell">Quantity</th>
                            <th className="head-cell">Price</th>
                        </tr>
                    </thead>
                 {
                    orderItems.map((item)=>(
                           <tbody>
                        <tr className='table-row'>
                            <td className="table-cell">
                                <img src={item.image} className='item-img' alt={item.name} />
                            </td>
                            <td className="table-cell">{item.name}   </td>
                            <td className="table-cell">{item.quantity}</td>
                            <td className="table-cell">{item.price}</td>
                        </tr>
                    </tbody>
                    ))
                 }
                </table>
        </div>
        {/* shipping info table */}
        <div className="table-block">
            <h2 className="table-title">
                Shipping Info
            </h2>
            <table className="table-main">
                <tbody>
                    <tr className='table-row'>
                        <th className="table-cell">Address</th>
                        <td className="table-cell">{shippingInfo.address},{shippingInfo.city},{shippingInfo.state},{shippingInfo.country}-{shippingInfo.pinCode}</td>
                    </tr>
                    <tr className='table-row'>
                        <th className="table-cell">Phone</th>
                        <td className="table-cell">{shippingInfo.phoneNo}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="table-block">
            <h2 className="table-title">Order Summary</h2>
            <table className="table-main">
                <tbody>
                    <tr className="table-row">
                        <th className="table-cell">Order Status</th>
                        <td className='table-cell'  >
                            <span className={orderStatusClass}>
                                {finalOrderStatus  }
                            </span>
                        </td>
                    </tr>
                    <tr className="table-row">
                        <th className="table-cell">Payment</th>
                        <td className='table-cell'  >
                            <span className={paymentStatusClass}>
                                {paymentStatus  }
                            </span>
                        </td>
                    </tr>
                   { paidAt &&( <tr className="table-row">
                        <th className="table-cell">Paid At</th>
                        <td className='table-cell'  >
                            {new Date(paidAt).toLocaleString()}
                        </td>
                    </tr>)}
                    <tr className="table-row">
                        <th className="table-cell">Items Price</th>
                        <td className='table-cell'  >
                            {itemsPrice}
                            
                        </td>
                    </tr>
                    <tr className="table-row">
                        <th className="table-cell">{taxPrice}</th>
                        <td className='table-cell'  >
                        </td>
                    </tr>
                    <tr className="table-row">
                        <th className="table-cell">Shipping Price</th>
                        <td className='table-cell'  >
                            {shippingPrice}
                        </td>
                    </tr>
                    <tr className="table-row">
                        <th className="table-cell">Total Price</th>
                        <td className='table-cell'  >
                            {totalPrice}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
   }
    <Footer/>
    </>
  )
}

export default OrderDetails
