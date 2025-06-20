import React from 'react'
import '../CartStyles/CheckoutPath.css'
import { AccountBalance, LibraryAddCheck, LocalShipping } from '@mui/icons-material'
const CheckoutPath = ({activePath}) => {
    const path=[
        {label:'Shipping Details',icon:<LocalShipping/>},
        {label:'Confirm Order',icon:<LibraryAddCheck/>},
        {label:'Payment',icon:<AccountBalance/>},
    ]
  return (
   <div className="checkoutPath">3
   {
    path.map((item,index)=>(
         <div active={index===activePath ? 'true' : 'false'}
         completed={activePath>=index ? 'true' : 'false'}
          className="checkoutPath-step" key={index}>
        <p className="checkoutPath-icon">{item.icon}</p>
        <p className="checkoutPath-label">{item.label}</p>
    </div>
    ))
   }
   </div>
  )
}

export default CheckoutPath
