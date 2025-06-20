import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../CartStyles/Shipping.css'
import CheckoutPath from './CheckoutPath'
import { useDispatch, useSelector } from 'react-redux'
import { Country, State, City }  from 'country-state-city';
import { saveShippingInfo } from '../features/cart/cartSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Shipping = () => {
    const {shippingInfo}=useSelector((state)=>state.cart)
    console.log(shippingInfo)
    const dispatch =  useDispatch()
    const navigate = useNavigate()

    const[address,setAddress]=useState(shippingInfo.address || "")
    const[pinCode,setPinCode]=useState( shippingInfo.pinCode || "")
    const[phoneNumber,setPhoneNumber]=useState( shippingInfo.phoneNumber || "") 
    const[country,setCountry]=useState( shippingInfo.country || "")
    const[state,setState]=useState( shippingInfo.state || "")
    const[city,setCity]=useState( shippingInfo.city || "")

    const shippingInfoSubmit=(e)=>{
        e.preventDefault()
        if(phoneNumber.length!==10){
            toast.error('Phone number should be of 10 digits!',{position:'top-center',autoClose:3000})
            return ;
        }
        dispatch(saveShippingInfo({address,pinCode,phoneNumber,country,state,city}))
        navigate('/order/confirm')
    }
    console.log(country)
    console.log(state)
    console.log(city)
  return (

    <>
      <PageTitle title="Shipping Details" />
      <Navbar/>
      <CheckoutPath activePath={0} />
      <div className="shipping-form-container">
        <h1 className="shipping-form-header">      Shipping Details</h1>
        <form action="" className="shipping-form" onSubmit={shippingInfoSubmit}>
            <div className="shipping-section">
                <div className="shipping-form-group">
                    <label htmlFor="address">Address</label>
                    <input  value={address} onChange={(e)=>setAddress(e.target.value)} type="text" id='address' name='address' placeholder='Enter your address' />
                </div>
                <div className="shipping-form-group">
                    <label htmlFor="pinCode">PinCode</label>
                    <input value={pinCode} onChange={(e)=>setPinCode(e.target.value)} type="number" id='pinCode' name='pinCode' placeholder='Enter your pinCode' />
                </div>
                <div className="shipping-form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} type="tel" id='phoneNumber' name='phoneNumber' placeholder='Enter your phone number' />
                </div>
                
            </div>
            <div className="shipping-section">
                <div className="shipping-form-group">
                    <label htmlFor="country">Country</label>
                    <select value={country} onChange={(e)=>{
                        setCountry(e.target.value)
                        setState("")
                        setCity("")

                    }} name="country" id="country">
                        <option value="">Select a Country</option>
                        {
                           Country && Country.getAllCountries().map(country=>(
                                <option  key={country.isoCode} value={country.isoCode}>{country.name}</option>
                            ))
                        }
      
                    </select>
                </div>
            {
                country &&     <div className="shipping-form-group">
                    <label htmlFor="state">State</label>
                    <select value={state} onChange={(e)=>{
                        setState(e.target.value)
                        setCity("")
                    }} name="state" id="state">
                        <option value="">Select a State</option>
                        {
                           State && State.getStatesOfCountry(country).map(state=>(
                                <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                            ))
                        }
                    </select>
                </div>
            }
               {
                state &&  <div className="shipping-form-group">
                    <label htmlFor="state">State</label>
                    <select value={city} onChange={(e)=>setCity(e.target.value)} name="state" id="state">
                        <option value="">Select a City</option>
                        {
                           City && City.getCitiesOfState(country,state).map(city=>(
                                <option key={city.isoCode} value={city.isoCode}>{city.name}</option>
                            ))
                        }
                       
                    </select>
                </div>
               }
              
            </div>
            <button className="shipping-submit-btn">Continue</button>
        </form>
      </div>
      <Footer/>
    </>
  )
}

export default Shipping
