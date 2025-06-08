import React from 'react'
import '../UserStyles/Form.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeErrors, removeSuccess, updateProfile } from '../features/user/userSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import Loader from '../components/Loader'
import PageTitle from '../components/PageTitle'

const UpdateProfile = () => {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[avatar,setAvatar]=useState('')
    const[avatarPreview,setAvatarPreview]=useState('/images/profile.png')
    const{user,error,loading,message,success}=useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const profileImageUpdate=(e)=>{
        setAvatar(e.target.files[0])
        setAvatarPreview(URL.createObjectURL(e.target.files[0]))

    }
    const updateSubmit=(e)=>{
        e.preventDefault()

        const myForm = new FormData()
        myForm.set('name',name)
        myForm.set('email',email)
        myForm.set('avatar',avatar)
        dispatch(updateProfile(myForm))
    }
      useEffect(()=>{
    
        if(error){
          toast.error(error,{
            position:'top-center',
            autoClose:3000
          })
          dispatch(removeErrors())
        }
      },[dispatch,error])
      useEffect(()=>{
    
        if(success){
          toast.success(message,{
            position:'top-center',
            autoClose:3000
          })
          dispatch(removeSuccess())
          navigate('/profile')
        }
      },[dispatch,success])
      useEffect(()=>{

        if(user){
          setName(user.name)
          setEmail(user.email)
          setAvatarPreview(user.avatar.url||'/images/profile.png')
        }
      },[user])
  return (
    <>
    {
        loading ? <Loader/> :(
              <>
    <Navbar/>
    <PageTitle title='Update Password'/>
    <div className="container update-container">
        <div className="form-content">
            <form  className="form" encType='multipart/form-data' onSubmit={updateSubmit}>
                <h2>Update Profile</h2>
                <div className="input-group avatar-group">
                    <input type="file" accept='image/' name='avatar' className="file-input" onChange={profileImageUpdate} />
                    <img src={avatarPreview} alt="User Profile" className="avatar" />

                </div>
                <div className="input-group" >
                    <input type="text" value={name} name='name' onChange={(e)=>setName(e.target.value)} />
                    
                </div>
                <div className="input-group">
                    <input type="email" value={email} name='email' onChange={(e)=>setEmail(e.target.value)} />
                    
                </div>
                <button className="authBtn"> Update</button>
            </form>
        </div>
    </div>
     

    <Footer/>
    </>
        )
    }
    </>
  
  )
}

export default UpdateProfile
