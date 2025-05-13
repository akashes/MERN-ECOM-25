import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../pageStyles/ProductDetails.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Rating from '../components/Rating'
import { getProduct, removeErrors } from '../features/products/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
const ProductPage = () => {
     const[userRating,setUserRating]=useState(0)
     const dispatch = useDispatch()

        const handleRatingChange=(newRating)=>{
            setUserRating(newRating)
        }
    const params = useParams()
    const id = params.id

    const {product,error,loading}=useSelector((state)=>state.product)
  

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
      },[dispatch,error])

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

    console.log(product)

  return (
    <>
    <PageTitle title={`${product?.name} - Details`} />
    <Navbar/>
    <div className="product-details-container">
        <div className="product-detail-container">
            <div className="product-image-container">

                <img src={product?.image[0]?.url} alt="Product title" className='product-detail-image' />

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
                        <button className="quantity-button">-</button>
                        <input type="text" value={1} className='quantity-value' readOnly   />
                        <button className="quantity-button">+</button>
                    
                     </div>
                     <button className="add-to-cart-btn">Add to Cart</button>
                  </>
                   
                   }
                     <form  className="review-form">
                        <h3>Write a Review</h3>
                        <Rating value={0}
                         disabled={false} 
                         onRatingChange={handleRatingChange}
                        />
                        <textarea className='review-input' placeholder='write your review here'></textarea>
                        <button className="submit-review-btn">
                            Submit Review
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
