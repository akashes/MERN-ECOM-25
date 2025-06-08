import React from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, removeErrors, removeSuccess } from '../features/user/userSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
const ForgotPassword = () => {
    const{success,loading,error,message}=useSelector(state=>state.user)
    const dispatch  = useDispatch()
    const[email,setEmail]=useState('')

    const forgotPasswordHandler=(e)=>{
        e.preventDefault()
        dispatch(forgotPassword(email))


        

    }
    useEffect(()=>{
        if(error){
            toast.error(error,{position:'top-center',autoClose:3000})
            dispatch(removeErrors())

        }

    },[dispatch,error])
    useEffect(()=>{
        if(success){
            
            toast.success(message,{position:'top-center',autoClose:3000})   
            dispatch(removeSuccess())
        }


    },[dispatch,success])
  return (
<>
{
    loading ? <Loader/> :    <>
   <PageTitle title='Forgot Password'/>
   <Navbar/>
   <div className="container forgot-container">
    <div className="form-content email-group">

    <form action="" className='form' onSubmit={forgotPasswordHandler}>
        <h2>Forgot Password</h2>
        <div className="input-group">
            <input type="email"  id="" placeholder='Enter your registered Email' name='email' 
            value={email} onChange={(e)=>setEmail(e.target.value)} />
            <button className="authBtn">Send</button>
        </div>
    </form>
    </div>
   </div>
   <Footer/>
   </>
}
</>
  )
}

export default ForgotPassword
