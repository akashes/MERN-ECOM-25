import React from 'react'
import '../UserStyles/Form.css'
import { useNavigate, useParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import { useState } from 'react'
import { removeErrors, removeSuccess, resetPassword } from '../features/user/userSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const ResetPassword = () => {
    const{error,success,loading}=useSelector(state=>state.user)
    console.log(error,success,loading)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const {token}=useParams()
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')

    const resetPasswordHandler=(e)=>{
        e.preventDefault()
        const data={
            password,
            confirmPassword
        }
 
       dispatch( resetPassword({token,userData:data}))
    }
    useEffect(()=>{
        if(error){
            toast.error(error,{position:'top-center',autoClose:3000})   
            dispatch(removeErrors())
        }

    },[dispatch,error])
    useEffect(()=>{
        if(success){
            toast.success('Password updated successfully',{position:'top-center',autoClose:3000})   
            dispatch(removeSuccess())
            navigate('/login')
        }
    },[dispatch,success])
  return (
   <>
   <PageTitle title="Reset Password"/>
      <div className="container form-container">

           <div className="form-content">
            <form  className="form" onSubmit={resetPasswordHandler}>
                <h2>Reset Password</h2>
              
                
                <div className="input-group" >
                    <input type="password" name='password' placeholder='Enter New Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                    
                </div>
                <div className="input-group" >
                    <input type="password" name='confirmPassword' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  />
                    
                </div>
                
                <button className="authBtn"> Reset Password</button>
            </form>
        </div>
   </div>
   </>
  )
}

export default ResetPassword
