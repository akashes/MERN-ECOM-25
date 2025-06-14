import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { addItemsToCart, removeError, removeItemFromCart, removeMessage } from '../features/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const CartItem = ({item}) => {
    const{success,loading,error,message,cartItems}=useSelector(state=>state.cart)

    

    const dispatch = useDispatch()
    const[quantity,setQuantity]=useState(item?.quantity)
    const total = item?.price*quantity

    const increaseQuantity=()=>{
        if(item.stock<=quantity){
            
            toast.error('Cannot exceed available stock!',{position:'top-center',autoClose:3000})
            dispatch(removeError())
            return
        }else{
            setQuantity(qty=>qty+1)
        }
    }
    const decreaseQuantity=()=>{
        if(quantity<=1){
            toast.error('Quantity cannot be less than 1!',{position:'top-center',autoClose:3000})
            dispatch(removeError())
            return;
        }else{
            setQuantity(qty=>qty-1)
        }
    }
    const handleUpdate=()=>{
        if(loading) return
        if(quantity !== item.quantity){
            
            dispatch(addItemsToCart({productId:item.product,quantity}))
        }
    }
    const handleRemoveItem=()=>{
        if(loading) return
        dispatch(removeItemFromCart(item.product))
    }
    useEffect(()=>{
        if(error){
            toast.error(error,{position:'top-center',autoClose:3000,toastId:'cart-error'})
            dispatch(removeError())
        }

    },[dispatch,error])
    useEffect(()=>{
        if(success){
           toast.success(message,{position:'top-center',autoClose:3000,toastId:'cart-update'})
            dispatch(removeMessage())
        }

    },[dispatch,success,message])
  return (
 <div className="cart-item">
                <div className="item-info">
                    <img src={item.image} alt={item.name} className='item-image' />
                    <div className="item-details">
                        <h3 className="item-name">
                            {item.name} 
                        </h3>
                        <p className="item-price"><strong>Price</strong>{item?.price.toFixed(2)} </p>
                        <p className="item-quantity"><strong>Quantity</strong>{item?.quantity}</p>
                    </div>
                </div>
                <div className="quantity-controls">
                    <button className="quantity-button decrease-btn" onClick={decreaseQuantity} disabled={loading}>-</button>
                    <input type="number" name="" id="" value={quantity} className='quantity-input' readOnly min='1' />
                    <button className="quantity-button increase-btn" onClick={increaseQuantity} disabled={loading}>+</button>

                </div>
                <div className="item-total">
                    <span className="item-total-price">{total.toFixed(2)}/-</span>
                </div>
                <div className="item-actions">
                    <button className="update-item-btn" onClick={handleUpdate} disabled={ loading || quantity===item.quantity}>{loading?'Updating...':'Update'}</button>
                    <button className="remove-item-btn" disabled={loading} onClick={handleRemoveItem} >Remove</button>
                </div>
            </div>
  )
}

export default CartItem
