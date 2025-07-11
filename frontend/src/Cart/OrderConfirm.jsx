import React from 'react'
import '../CartStyles/OrderConfirm.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import CheckoutPath from './CheckoutPath'
import { useNavigate } from 'react-router-dom'

const OrderConfirm = () => {
    const navigate = useNavigate()
    const{shippingInfo,cartItems}=useSelector(state=>state.cart)
    const {user}=useSelector(state=>state.user)
    console.log(shippingInfo)
    console.log(cartItems)
    console.log(user)

     const subTotal = cartItems.reduce((acc,currItem)=>acc+(currItem.price*currItem.quantity),0)

    //18% Tax
    const tax = subTotal*0.18

    //shipping price

    const shippingCharges = subTotal>500 ? 0 : 50

    //total price
    const totalPrice = subTotal+tax+shippingCharges


    const proceedToPayment=()=>{
        const data = {
            subTotal,
            tax,
            shippingCharges,
            totalPrice
        }
        sessionStorage.setItem('orderItem',JSON.stringify(data))
        navigate('/process/payment')
    }
  return (
      <>
    <PageTitle title='Order Confirm' />
      <Navbar/> 
      <CheckoutPath activePath={1}/>
    <div className="confirm-container">
        <h1 className="confirm-header">Order Confirmation</h1>
        <div className="confirm-table-container">
            <table className="confirm-table ">
                <caption>Shipping Details</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.name}</td>
                        <td>{shippingInfo.phoneNumber}</td>
                        <td>{shippingInfo.address},{shippingInfo.city},{shippingInfo.state},{shippingInfo.pinCode}</td>
                    </tr>
                </tbody>

            </table>
            <table className="confirm-table cart-table">
                <caption>Cart Items</caption>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.product}>
                            <td><img src={item.image} alt={item.name} className='product-image' /></td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table className="confirm-table">
                <caption>Order Summary</caption>
                <thead>
                    <tr>
                        <th>Subtotal</th>
                        <th>Shipping Charges</th>
                        <th>GST</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{subTotal}/-</td>
                        <td>{shippingCharges}/-</td>
                        <td>{tax}/-</td>
                        <td>{totalPrice}/-</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button className="proceed-button" onClick={proceedToPayment}>Proceed to Payment</button>
    </div>


    <Footer/>
    </>
  )
}

export default OrderConfirm
