import React from 'react'
import '../UserStyles/Form.css'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { removeErrors, removeSuccess, updatePassword } from '../features/user/userSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Loader from '../components/Loader.jsx'
const UpdatePassword = () => {
    const{success,loading,error}=useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const[oldPassword,setOldPassword]=useState('')
    const[newPassword,setNewPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')
    const updatePasswordSubmit=async(e)=>{
        e.preventDefault()

       dispatch(updatePassword({oldPassword,newPassword,confirmPassword}))
      


        

        
    }
    useEffect(()=>{
        if(error){
            console.log('error occured',error)
            toast.error(error.message,{position:'top-center',autoClose:3000})
            dispatch(removeErrors())
        }

    },[dispatch,error])

    useEffect(()=>{
        if(success){
            toast.success('Password updated successfully',{position:'top-center',autoClose:3000})
            dispatch(removeSuccess())
            navigate('/profile')
        }

    },[dispatch,success])
  return (
<>
{
    loading?<Loader/> :     <>
    <Navbar/>

   <div className="container update-container">

           <div className="form-content">
            <form  className="form" onSubmit={updatePasswordSubmit}>
                <h2>Update Password</h2>
              
                <div className="input-group" >
                    <input type="password" name='oldPassword' placeholder='Old Password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
                    
                </div>
                <div className="input-group" >
                    <input type="password" name='newPassword' placeholder='New Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                    
                </div>
                <div className="input-group" >
                    <input type="password" name='confirmPassword' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  />
                    
                </div>
                
                <button className="authBtn"> Update</button>
            </form>
        </div>
   </div>
    </>
}

</>

  )
}

export default UpdatePassword
