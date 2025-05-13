import React, { useEffect } from 'react'
import '../pageStyles/Products.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../features/products/productSlice'
import Product from '../components/Product'
import Loader from '../components/Loader'

const Products = () => {
    const dispatch = useDispatch()
    const {products,loading,error}=useSelector(state=>state.product)
    useEffect(()=>{

        dispatch(fetchProducts())

    },[dispatch])

      useEffect(()=>{
    
        if(error){
          toast.error(error.message,{
            position:'top-center',
            autoClose:3000
          })
          dispatch(removeErrors())
        }
      },[dispatch,error])
  return (
 <>
   {loading ? (<Loader/>):(
     <>
    <PageTitle title='All Products'/>
    <Navbar/>
    <div className="products-layout">
        <div className="filter-section">
            <h3 className='filter-heading'>CATEGORIES</h3>
            {/* render categories */}
        </div>
        <div className="products-section">

            <div className="products-product-container">
                {
                    products.map(product=>(
                        <Product key={product._id} product={product} />
                    ))
                }

            </div>
        </div>
    </div>
    <Footer/>


    </>
   )}
 </>
  )
}

export default Products
