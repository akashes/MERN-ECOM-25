import React, { useEffect, useState } from 'react'
import '../UserStyles/Form.css'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import { register, removeErrors, removeSuccess } from '../features/user/userSlice'

const Register = () => {
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const[user,setUser]=useState({
        name:'',
        email:'',
        password:''
    })
    const[avatar,setAvatar]=useState('')
    const[avatarPreview,setAvatarPreview]=useState('./images/profile.png')
    const{name,email,password}=user

    const{success,loading,error}=useSelector(state=>state.user)

    const handleUserInput=(e)=>{
        if(e.target.name==='avatar'){
            // const reader=new FileReader()
            // reader.onload=()=>{
            //     if(reader.readyState===2){
            //         setAvatarPreview(reader.result)
            //         // setAvatar(reader.result)
            //         // changing base64 string to file
            //         // setAvatar(e.target.files[0])
            //     }
            // }
            // reader.readAsDataURL(e.target.files[0])
            const file = e.target.files[0]
            if(file.size > 8*1024*1024){
                toast.error('Image size should be less than 8MB',
                {position:'top-center',autoClose:3000})
                return
            }
            setAvatar(file)
            setAvatarPreview(URL.createObjectURL(file))

        }else{
            setUser((prev)=>({...prev,[e.target.name]:e.target.value}))
        
        }

    }
    const registerSubmit=(e)=>{
        e.preventDefault()
        if(!name || !email || !password){
            toast.error('Please fill out all required fields',
                {position:'top-center',autoClose:3000})
                return;
        }
       const myForm = new FormData()
       myForm.set('name',name)
       myForm.set('email',email)
       myForm.set('password',password)
       myForm.set('avatar',avatar)

    //    console.log(myForm)
    //    console.log(myForm.entries())
    //    for(let pair of myForm.entries()){
    //     console.log(pair[0]+', '+pair[1])
    //    }
    dispatch(register(myForm))

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
          toast.success('Registration Successful',{
            position:'top-center',
            autoClose:3000
          })
          dispatch(removeSuccess())
          navigate('/login')
        }
      },[dispatch,success])

  return (
   <div className="form-container container">
    <div className="form-content">
        <form  className="form" onSubmit={registerSubmit}  encType='multipart/form-data' >
            <h2>Sign Up</h2>
            <div className="input-group">
                <input onChange={handleUserInput} type="text" placeholder='Username' name='name' value={name} />
                

            </div>
            <div className="input-group">
                <input onChange={handleUserInput} type="email" placeholder='Email' name='email' value={email} />


            </div>
            <div className="input-group">
                <input onChange={handleUserInput} type="password" placeholder='Password' name='password' value={password} />


            </div>
            <div className="input-group avatar-group">
                <input onChange={handleUserInput} type="file"  name='avatar' className='file-input'
                accept='image/'
                />
                <img src={avatarPreview} alt="Avatar preview" className='avatar' />


            </div>
            <button className="authBtn">{loading?'Signing Up':'Sign Up'}</button>
            <p className="form-links">
                Already have an account? <Link to='/login' >Sign in here</Link>
            </p>
        </form>
    </div>
   </div>
  )
}

export default Register
