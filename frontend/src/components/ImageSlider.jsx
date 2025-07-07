import React, { useEffect, useState } from 'react'
import '../componentStyles/ImageSlider.css'
const images=[
    './images/image.webp',
    './images/image.webp',
    './images/image.webp',
    './images/image.webp'
]
const ImageSlider = () => {
    const[currentIndex,setCurrentIndex]=useState(0)
    useEffect(() => { 
       
     const interval=   setInterval(()=>{
            setCurrentIndex(prev=>(prev+1)%images.length)

        },5000)
        return () => {
            clearInterval(interval)
        }
    },[])
  return (
    <div className='image-slider-container'>
        <div className="slider-images" style={{transform:`translateX(-${currentIndex*100}%)`}}>
{      images.map((image,index)=>{
    return(
        <div className="slider-item" key={index}>
                <img src={image} alt={`Slide ${index+1}`} loading='lazy'/>
            </div>

    )
})      }
         
       
        </div>
          <div className="slider-dots" style={{zIndex:'1'}}>
            {

           images.map((_,index)=>{
            return(

                <span onClick={()=>setCurrentIndex(index)} className={`dot ${index === currentIndex ? 'active' : ''}`}>
                                </span>

            )
           }) 
            }

         </div>
      
    </div>
  )
}

export default ImageSlider
