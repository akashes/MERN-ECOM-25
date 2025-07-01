import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../pageStyles/ProductDetails.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Rating from '../components/Rating'
import { createReview, getProduct, removeErrors, removeSuccess } from '../features/products/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { addItemsToCart, removeMessage } from '../features/cart/cartSlice'
const ProductPage = () => {
     const[userRating,setUserRating]=useState(0)
     const[comment,setComment]=useState('')

     const[selectedImage,setSelectedImage]=useState('')
     const dispatch = useDispatch()
         const params = useParams()
    const id = params.id

     const{loading:cartLoading,error:cartError,success:cartSuccess,message:cartMessage,cartItems}=useSelector((state)=>state.cart)
     let itemQuantity = cartItems.find(i=>i.product===id)? cartItems.find(i=>i.product===id).quantity :1;
     const [quantity,setQuantity]=useState(itemQuantity)
   

        const handleRatingChange=(newRating)=>{
            setUserRating(newRating)
        }
        const decreaseQuantity=()=>{
            if(quantity<=1){
                  toast.error('Quantity cannot be less than 1!',
                    {
                        position:'top-center',autoClose:3000
                    }
                )
                dispatch(removeErrors())
                return;
            }
            setQuantity(qty=>qty-1)

        }
        const increaseQuantity=()=>{
            if(product.stock<=quantity){
                toast.error('Cannot exceed available stock!',
                    {
                        position:'top-center',autoClose:3000
                    }
                )
                dispatch(removeErrors())
                return;
            }

                setQuantity(qty=>qty+1)

            
            

        }


    const {product,error,loading,reviewSuccess,reviewLoading}=useSelector((state)=>state.product)
    console.log(product)
  
    const addToCart=()=>{
        dispatch(addItemsToCart({productId:id,quantity}))
    }

    useEffect(()=>{

        if(id){
            dispatch(getProduct(id))
        }

        return()=>{
            dispatch(removeErrors())
        }
     
    },[dispatch,id])
      useEffect(()=>{
    
        if(error){
          toast.error(error.message,{
            position:'top-center',
            autoClose:3000
          })
          dispatch(removeErrors())
        }
        if(cartError){
          toast.error(cartError,{
            position:'top-center',
            autoClose:3000
          })
        }
      },[dispatch,error,cartError])
      useEffect(()=>{
    
        if(cartSuccess){
          toast.success(cartMessage,{
            position:'top-center',
            autoClose:3000
          })
          dispatch(removeMessage())
        }
       
      },[dispatch,cartSuccess,cartMessage])


    console.log(product)

    const handleSubmitReview=(e)=>{
        e.preventDefault(); 
        if(!userRating){
          toast.error('Please select a rating before submitting your review', {
            position: 'top-center',
            autoClose: 3000
          })
          return;
        }
        dispatch(createReview({rating:userRating,comment,productId:id}))
    }

    useEffect(()=>{
        if(reviewSuccess){
          toast.success('Review submitted successfully!',{
            position: 'top-center',
            autoClose: 3000
          })
          setUserRating(0)
          setComment('')
          dispatch(removeSuccess())
          dispatch(getProduct(id)) // Refresh product details to show new review
        }
        },[dispatch,reviewSuccess,id])

        useEffect(()=>{
          if(product && product.image && product.image.length>0){
            setSelectedImage(product.image[0].url)
          }
        },[product])
        console.log(selectedImage)

            if(loading){
      return (

          <>
      <Navbar/>
      <Loader/>
      <Footer/>
      </>
        )
    }
    if(error || !product){
      return (
        <>
        <PageTitle title={`Product not found`} />
        <Navbar/>
        <h1 style={{marginTop:"100px"}}>Product not found</h1>
        <Footer/>
        </>
      )
    }

  return (
    <>
    <PageTitle title={`${product?.name} - Details`} />
    <Navbar/>
    <div className="product-details-container">
        <div className="product-detail-container">
            <div className="product-image-container">

                <img src={selectedImage} alt="Product title" className='product-detail-image' />
                {
                  product?.image.length>1 && (
                    <div className="product-thumbnails">
                  {
                    product.image.map((img,index)=>(
                      
                      <img key={index} src={img.url} alt={`Thumbnail:${index+1}`} className='thumbnail-image' onClick={()=>setSelectedImage(img.url)}/>
                    ))
                  }
                  {/* <img src="" alt="" className='thumbnail-image' /> */}
                </div>
                  )
                }

            </div>
            <div className="product-info">
                <h2>{product?.name}</h2>
                <p className="product-description">
                    {product.description}
                </p>
                <p className="product-price">
                    Price: {product.price}/-
                </p>
                <div className="product-rating"> 
                    <Rating value={product.ratings} disabled={true} />
                         <span className="productCardSpan">
                {product.numOfReviews}{product.numOfReviews===1?" Review":" Reviews"} 

                    </span>
                     </div>

                     <div className="stock-status">
                        <span className={product.stock>0?'in-stock':'out-of-stock'}>
                            {
                                product.stock>0 ?`In Stock (${product.stock} available)`:`Out of Stock` 
                            }
                        </span>
                     </div>
                  { product.stock>0 &&  <>
                      <div className="quantity-controls">
                        <span className="quantity-label">
                            Quantity :
                        </span>
                        <button className="quantity-button" onClick={decreaseQuantity} >-</button>
                        <input type="text" value={quantity} className='quantity-value' readOnly   />
                        <button className="quantity-button" onClick={increaseQuantity}>+</button>
                    
                     </div>
                     <button className="add-to-cart-btn" onClick={addToCart} disabled={cartLoading} >{cartLoading?'Adding':"Add to Cart"}</button>
                  </>
                   
                   }
                     <form  className="review-form" onSubmit={handleSubmitReview}>
                        <h3>Write a Review</h3>
                        <Rating value={0}
                         disabled={false} 
                         onRatingChange={handleRatingChange}
                        />
                        <textarea  required value={comment} onChange={(e)=>setComment(e.target.value)}  className='review-input' placeholder='write your review here'></textarea>
                        <button className="submit-review-btn" disabled={reviewLoading} type='submit'>
                            { reviewLoading?'Submitting': 'Submit Review'}
                        </button>
                     </form>
            </div>
        </div>
        <div className="reviews-container">
            <h3>Customer Reviews</h3>
           { 
           product.reviews && product.reviews.length>0 ?(
            <div className="reviews-section">
               {
                product.reviews.map((review,index)=>{
                    return(
                         <div className="review-item" key={review._id}>
                    <div className="review-header">
                        <Rating value={review.rating} disabled={true} />
                    </div>
                    <p className="p review-comment">{review.comment}</p>
                    <p className="review-name">{review.name}</p>
                </div>
                    )
                })
               }
            </div>

           ):(
            <p>No reviews yet . Be the first to write a review</p>
           )
            
            }
        </div>
    </div>

    <Footer/>
    </>
  )
}

export default ProductPage
