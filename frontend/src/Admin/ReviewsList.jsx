import React, { useEffect, useState } from 'react'
import '../AdminStyles/ReviewsList.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import { Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, deleteReview, fetchAdminProducts, fetchProductReviews, removeErrors, removeSuccess } from '../features/admin/adminSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const ReviewsList = () => {
    const {products,loading,error,reviews,success,message}=useSelector(state=>state.admin)
    const[selectedProduct,setSelectedProduct]=useState(null)

    const dispatch = useDispatch()

    const loadReviews=(productId)=>{
        setSelectedProduct(productId)
        dispatch(fetchProductReviews(productId))
    }
    const handleDeleteReview=(productId,reviewId)=>{
        const confirm = window.confirm('Are you sure you want to delete this review?')
        if(confirm){
            dispatch(deleteReview({productId,reviewId}))
        }
    }
    useEffect(() => {
      
        dispatch(fetchAdminProducts())
    }, [dispatch]);
    useEffect(() => {
      if(error){
        toast.error(error,{
            position:'top-center',
            autoClose:3000
        })
        dispatch(removeErrors())
      }
    }, [error,dispatch]);
    useEffect(() => {
      if(success){
        toast.success(message,{position:'top-center',autoClose:3000})
        dispatch(clearMessage())
        dispatch(removeSuccess())
        
      }
    }, [dispatch,success]);

    if(!products || products.length===0){
        return (
            <div className="reviews-list-container">
                <h1 className="reviews-list-title">Admin Reviews</h1>
                <p>No Product Found</p>
            </div>
        )
    }
  return (
    
  <>
    <Navbar/>
    <PageTitle title='All Reviews' />
    <div className="reviews-list-container">
        <h1 className="reviews-list-title">All Products</h1>
        <table className="reviews-table">
            <thead>
                <th>sl No</th>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Number of Reviews</th>
                <th>Action</th>
            </thead>
            <tbody>
              {
                products.map((product,index)=>(
                      <tr key={product._id}>
                    <td>{index+1}</td>
                    <td>{product.name}</td>
                    <td>
                        <img src={product.image[0].url} alt="" className='product-image' />
                    </td>
                    <td>{product.numOfReviews}</td>
                    <td>
                        {
                            product.numOfReviews > 0 ? <button onClick={()=>loadReviews(product._id)} className="action-btn view-btn">
                            view Reviews
                        </button> : <p>No reviews available!</p>
                        }
                        
                    </td>
                </tr>
                ))
              }
            </tbody>
        </table>


{
    reviews && reviews.length>0 &&  <div className="reviews-details">
            <h2>Reviews for Product</h2>
            <table className='reviews-table'>
                <thead>
                    <tr>
                        <th>sl No</th>
                        <th>Reviewer Name</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
             {
                reviews.map((review,index)=>(
                           <tr key={review._id}>
                        <td>{index+1}</td>
                        <td>{review.name}</td>
                        <td>{review.rating}</td>
                        <td>{review.comment}</td>
                        <td>
                            <button onClick={()=>handleDeleteReview(selectedProduct,review._id)} className="action-btn delete-btn">
                                <Delete/>
                            </button>
                        </td>
                    </tr>
                ))
             }
                </tbody>
            </table>
        </div>
}
       
    </div>


    <Footer/>
    </>
    
    
    
  )
}

export default ReviewsList
