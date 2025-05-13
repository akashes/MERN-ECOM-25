import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../pageStyles/ProductDetails.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Rating from '../components/Rating'
const ProductPage = () => {
     const[userRating,setUserRating]=useState(0)
        const handleRatingChange=(newRating)=>{
            setUserRating(newRating)
        }
    const[products,setProducts] = useState({})
    const params = useParams()
    const id = params.id

    useEffect(()=>{
        const fetchData=async()=>{
            
            const res = await axios.get(`/api/v1/products/${id}`)
            setProducts(res.data.product)
        }
        fetchData()

    },[id])

    console.log(products)

  return (
    <>
    <PageTitle title='product Name - Details' />
    <Navbar/>
    <div className="product-details-container">
        <div className="product-detail-container">
            <div className="product-image-container">
                <img src="" alt="Product title" className='product-detail-image' />

            </div>
            <div className="product-info">
                <h2>Product Name</h2>
                <p className="product-description">
                    Product Description
                </p>
                <p className="product-price">
                    Price: 200/-
                </p>
                <div className="product-rating"> 
                    <Rating value={2} disabled={true} />
                    <span className="productCardSpan">
                        (1 Review)
                    </span>
                     </div>
                     <div className="stock-status">
                        <span className="in-stock">
                            In Stock (8 available)
                        </span>
                     </div>
                     <div className="quantity-controls">
                        <span className="quantity-label">
                            Quantity :
                        </span>
                        <button className="quantity-button">-</button>
                        <input type="text" value={1} className='quantity-value' readOnly   />
                        <button className="quantity-button">+</button>
                    
                     </div>
                     <button className="add-to-cart-btn">Add to Cart</button>
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
            <div className="reviews-section">
                <div className="review-item">
                    <div className="review-header">
                        <Rating value={2} disabled={true} />
                    </div>
                    <p className="p review-comment">Review Comment</p>
                    <p className="review-namee">By Akash</p>
                </div>
            </div>
        </div>
    </div>

    <Footer/>
    </>
  )
}

export default ProductPage
