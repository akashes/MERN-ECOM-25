import React from 'react'
import '../componentStyles/Pagination.css'
import { useSelector } from 'react-redux'
import { current } from '@reduxjs/toolkit'

const Pagination = (
    {
        currentPage,
        onPageChange,
        activeClass='active',
        nextPageText='Next',
        prevPageText='Prev',
        firstPageText='First',
        lastPageText='Last'
    }
) => {

    const{totalPages,products}=useSelector((state)=>state.product)
    if(products.length===0||totalPages<=1){
        return null
    }
    //generate page numbers
    const getPageNumbers=()=>{
            const pageNumbers=[]
            const pageWindow=2
            for(let i=Math.max(1,currentPage-pageWindow);i<=Math.min(totalPages,currentPage+pageWindow);i++){
                pageNumbers.push(i)
            }
            return pageNumbers
    }
  return (
    <div className='pagination'>
        {/* previous and first buttons */}
        {
            currentPage>1 && (


               <>
                <button className='pagination-btn' onClick={()=>onPageChange(1)} >{firstPageText}</button>
                <button className='pagination-btn' onClick={()=>onPageChange(currentPage-1)}>{prevPageText}</button>
               </>
            )
        }
        {/* display numbers */}
        {
            getPageNumbers().map((page)=>(
                <button className={`pagination-btn ${currentPage===page?activeClass:''}`} key={page}
                 onClick={()=>onPageChange(page)}>{page}</button>
            ))
        }
        
        {/* last and next buttons */}
        {
            currentPage<totalPages && (


               <>
                <button className='pagination-btn' onClick={()=>onPageChange(currentPage+1)} >{nextPageText}</button>
                <button className='pagination-btn' onClick={()=>onPageChange(totalPages)}>{lastPageText}</button>
               </>
            )
        }
      
    </div>
  )
}

export default Pagination
