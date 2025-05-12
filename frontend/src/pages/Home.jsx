import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/Footer'
import ImageSlider from '../components/ImageSlider'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Product from '../components/Product'
import '../pageStyles/Home.css'
import { useEffect } from 'react'
import { fetchProducts } from '../features/products/productSlice.js'
// const products=[
//    {
//             "_id": "6818ddbba199ed8135a62be8",
//             "name": "charger",
//             "description": "18 w fast charger",
//             "price": 2000,
//             "ratings": 2,
//             "category": "electronics",
//             "stock": 96,
//             "numOfReviews": 1,
//             "user": "6818b69b44dc82c8095cd862",
//             "image": [
//               {"url":"This is test id",
//               "_id":"6818ddbba199ed8135a62be8"}
//             ],
//             "reviews": [],
//             "createdAt": "2025-05-05T15:48:11.905Z",
//             "__v": 12
//         },
//         {
//             "_id": "681d3629cc32e4b0214e2d8f",
//             "name": "water bottle",
//             "description": "1 liter bottle",
//             "price": 300,
//             "ratings": 4,
//             "category": "home",
//             "stock": 1,
//             "numOfReviews": 0,
//             "user": "6818b69b44dc82c8095cd862",
//             "image": [
//                    {"url":"This is test id",
//               "_id":"6818ddbba199ed8135a62be8"}
//             ],
//             "reviews": [],
//             "createdAt": "2025-05-08T22:54:33.351Z",
//             "__v": 0
//         }
// ]
const Home = () => {
  
  const dispatch = useDispatch()
  const {loading,error,products,productCount} = useSelector((state)=>state.product)
  useEffect(()=>{
    
    dispatch(fetchProducts())
  },[dispatch])
  console.log(products)
  return (
   <>
   <PageTitle title="Home-My Shop "/>
   <Navbar/>
   <ImageSlider/>
    <div className="home-container">
      <h2 className="home-heading">Trending Now</h2>
      <div className="home-product-container">
        {
        products.length>0 && products.map((product)=>{
          console.log('producttt')
         return (
         <Product product={product} key={product._id} />
        )
        })
      }
      </div>

    </div>
<Footer/>    
   </>
  )
}

export default Home
