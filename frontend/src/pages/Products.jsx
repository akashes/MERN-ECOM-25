import React, { useEffect } from 'react'
import '../pageStyles/Products.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, removeErrors } from '../features/products/productSlice'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import NoProducts from '../components/NoProducts'
import Pagination from '../components/Pagination'

const Products = () => {
    const dispatch = useDispatch()
    const {products,loading,error,totalPages,resultsPerPage,productCount}=useSelector(state=>state.product)
    const navigate  = useNavigate()

    const[isInitialLoading,setIsInitialLoading]=React.useState(true)

// getting query values from url
    const location = useLocation()
   const searchParams = new URLSearchParams(location.search)
   const keyword = searchParams.get('keyword')
   const category = searchParams.get('category')
   const pageFromURL = parseInt(searchParams.get('page'),10)||1

   const [currentPage,setCurrentPage]=React.useState(pageFromURL)
 
   const categories=["laptop","mobile","gadget","electronics","glass"]
    useEffect(()=>{
            dispatch(fetchProducts({keyword,page:currentPage,category}))
            .unwrap()
            .then(()=>setIsInitialLoading(false))
     


    },[dispatch,keyword,currentPage,category])

      useEffect(()=>{
    
        if(error){
          toast.error(error.message,{
            position:'top-center',
            autoClose:3000
          })
          dispatch(removeErrors())
        }
      },[dispatch,error])
console.log(products)
const handlePageChange=(page)=>{
  // this condtion helps to avoid unnecessary rerenders 
  if(page!==currentPage){
    setCurrentPage(page)
   const newSearchParams= new URLSearchParams(location.search)
   if(page===1){
    newSearchParams.delete('page')
   }else{
    newSearchParams.set('page',page)
   }
   navigate(`?${newSearchParams.toString()}`)

  }
}
const handleCategoryClick=(category)=>{
  const newSearchParams= new URLSearchParams(location.search)
  newSearchParams.set('category',category)
  newSearchParams.delete('page')
  // setCurrentPage(1)
  // newSearchParams.set('page',1)
  navigate(`?${newSearchParams.toString()}`)
}
  return (
 <>
   {loading && isInitialLoading ? (<Loader/>):(
     <>
    <PageTitle title='All Products'/>
    <Navbar/>
    <div className="products-layout">
        <div className="filter-section">
            <h3 className='filter-heading'>CATEGORIES</h3>
            {/* render categories */}
            <ul>
              {
                categories.map(category=>(
                  <li
                  onClick={()=>handleCategoryClick(category)}
                   key={category}>{category}</li>
                ))
              }
            </ul>
        </div>
        <div className="products-section">

        {products.length>0?    <div className="products-product-container">
                {
                    products.map(product=>(
                        <Product key={product._id} product={product} />
                    ))
                }

            </div>
            :
            <NoProducts keyword={keyword}/>  
            }
            <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
    </div>
    <Footer/>


    </>
   )}

 </>
  )
}

export default Products
