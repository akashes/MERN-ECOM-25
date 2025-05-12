import React, { useState } from 'react'
import { Star } from '@mui/icons-material'
import { StarOutline } from '@mui/icons-material'
import '../componentStyles/Rating.css'

const Rating = ({value,onRatingChange,disabled}) => {
    const [hoveredRating,setHoveredRating]=useState(0)
    const[selectedRating,setSelectedRating]=useState(value||0)

    //handle star hoverRating
    const handleMouseEnter =(rating)=>{
        if(!disabled){setHoveredRating(rating)}
    }

    //mouse leave
    const handleMouseLeave=()=>{
        if(!disabled){setHoveredRating(0)}
    }

    //handle onClick
    const handleClick=(rating)=>{
        if(!disabled){setSelectedRating(rating)
           if(onRatingChange){

               onRatingChange(rating)}
           }
    }

    //fn to generate stars based on rating
    const generateStars=()=>{
        const stars=[]
        for(let i=1;i<=5;i++){
            const isFilled = i<=(hoveredRating || selectedRating)
            stars.push(
                <span 
                onMouseEnter={()=>handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                onClick={()=>handleClick(i)}
                key={i}
                style={{pointerEvents:disabled?'none':'auto'}}
                className={`star ${isFilled?'filled':'empty'}`}>★</span>
            )
        }
        return stars
    }

  return (
    <div className='rating'>
       { generateStars()}

     
    </div>
  )
}

export default Rating
