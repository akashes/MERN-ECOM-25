import React, { useEffect } from 'react'
import '../CartStyles/PaymentSuccess.css'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createOrder, removeErrors, removeSuccess } from '../features/order/orderSlice'
import { clearCart } from '../features/cart/cartSlice'
import Loader from '../components/Loader'

const PaymentSuccess = () => {
    const orderItem = JSON.parse( sessionStorage.getItem('orderItem'))
    
    console.log(orderItem)
    const [searchParams ]=useSearchParams()
    const reference = searchParams.get('reference')

    const{cartItems,shippingInfo}=useSelector(state=>state.cart)
    const{success,loading,error}=useSelector(state=>state.order)

    const dispatch  = useDispatch()

    useEffect(()=>{
        if(!orderItem) return 

        const createOrderData=async()=>{
            try {

                const orderData = {
                    shippingInfo:{
                        address:shippingInfo.address,
                        city:shippingInfo.city,
                        state:shippingInfo.state,
                        country:shippingInfo.country,
                        pinCode:shippingInfo.pinCode,
                        phoneNo:shippingInfo.phoneNumber
                    },
                    orderItems:cartItems.map((item)=>({
                        name:item.name,
                        price:item.price,
                        quantity:item.quantity,
                        image:item.image,
                        product:item.product
                    })),
                    paymentInfo:{
                        id:reference,
                        status:'succeeded'
                    },
                    itemsPrice:orderItem.subTotal,
                    taxPrice:orderItem.tax,
                    shippingPrice:orderItem.shippingCharges,
                    totalPrice:orderItem.totalPrice,
                }
                console.log('sending data',orderData)
                dispatch(createOrder(orderData))
                sessionStorage.removeItem('orderItem')
                
            } catch (error) {
                console.log('order creation error',error);
                toast.error(error.message || 'order creation error',{position:'top-center',autoClose:3000})

                
                
            }

        }

        createOrderData()

    },[])

    useEffect(()=>{
        if(success){
            toast.success('Order Placed',{position:'top-center',autoClose:3000})
            dispatch(clearCart())
            dispatch(removeSuccess())
        }

    },[dispatch,success])
    useEffect(()=>{
        if(error){
            toast.error(error,{position:'top-center',autoClose:3000})
            dispatch(removeErrors())
        }

    },[dispatch,error])
  return (
    <>
    {
        loading? <Loader/> : <>
    <PageTitle title='Payment Status'/>
    <Navbar/>
    <div className="payment-success-container">
        <div className="success-content">

        <div className="success-icon">
            <div className="checkmark">

            </div>
        </div>
            <h1>Order Confirmed!</h1>
            <p>Your payment was successful .Reference ID : <strong>{reference}</strong> </p>
            <Link className='explore-btn' to='/orders/user'>View Orders</Link>
        </div>
    </div>
    <Footer/>
    </> 
    }
    </>
   
  )
}

export default PaymentSuccess
