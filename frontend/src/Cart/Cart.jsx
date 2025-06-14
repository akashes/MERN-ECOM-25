import React from 'react'
import '../CartStyles/Cart.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Cart = () => {

    const{cartItems}=useSelector(state=>state.cart)
    const subTotal = cartItems.reduce((acc,currItem)=>acc+(currItem.price*currItem.quantity),0)

    //18% Tax
    const tax = subTotal*0.18

    //shipping price

    const shipping = subTotal>500 ? 0 : 50

    //total price
    const totalPrice = subTotal+tax+shipping
    
  return (
  
    <>
  <Navbar/>
        <PageTitle title="Your Cart" />

    {
        cartItems.length===0?
         (
            <div className="empty-cart-container">
                <p className="empty-cart-message">
                    Your Cart is empty
                </p>
                <Link to='/products' className='viewProducts'>View Products</Link>
            </div>
        )
        :
        <>
  <div className="cart-page">
    <div className="cart-items">
        <div className="cart-items-heading">
            Your Cart
        </div>
        <div className="cart-table">
            <div className="cart-table-header">
                <div className="header-product">Product</div>
                <div className="header-quantity">Quantity</div>
                <div className="header-total item-total-heading">Item Total</div>
                <div className="header-action item-total-heading">Actions</div>
            </div>
            {/* cart items */}
            {
                cartItems?.length>0 && cartItems.map((item)=>(

                    <CartItem item={item} />
                ))
            }
           


        </div>
    </div>
    {/* price summary */}
    <div className="price-summary">
        <h3 className="price-summary-heading">Price Summary</h3>
        <div className="summary-item">
            <p className="summary-label">Subtotal:</p>
        <p className="summary-value">{subTotal}/-</p>
        
        </div>
        <div className="summary-item">
            <p className="summary-label">Tax 18%</p>
        <p className="summary-value">{tax}/-</p>

        </div>
        <div className="summary-item">
            <p className="summary-label">Shipping</p>
        <p className="summary-value">{shipping}/-</p>

        </div>
        <div className="summary-total">
            <p className="total-label">Total</p>
        <p className="total-value">{totalPrice}/-</p>

        </div>
        <button className="checkout-btn">
            Proceed to Checkout
        </button>
    </div>
  </div>
  </>
    }
    <Footer/>
    </>
  )
}

export default Cart
