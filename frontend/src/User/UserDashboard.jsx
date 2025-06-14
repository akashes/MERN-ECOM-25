import React from 'react'
import '../UserStyles/UserDashboard.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {logout, removeSuccess} from '../features/user/userSlice.js'
import { toast } from 'react-toastify'
const UserDashboard = ({user}) => {
    const{cartItems}=useSelector(state=>state.cart)
    const[show,setShow]=React.useState(false)
    const navigate =useNavigate()
    const dispatch = useDispatch()
    const options=[
        {name:"Orders",funcName:orders},
        {name:"Account",funcName:profile},
        {name: `Cart (${cartItems.length})`,function:myCart,isCart:true},
        {name:"Logout",funcName:logoutUser},
    ]
    if(user.role==='admin'){
        options.unshift({name:"Admin Dashboard",funcName:dashboard})
    }
    function orders(){
        navigate('/orders/user')
    }
    function profile(){
        navigate('/profile')
    }
    function myCart(){
        navigate('/cart')
    }
    function logoutUser(){
       dispatch(logout())
       .unwrap()
       .then(()=>{
        toast.success('Logout successful.',{position:'top-center',autoClose:3000})
        dispatch(removeSuccess())
        navigate('/login')
       })
       .catch((error)=>{
        toast.error(error.message || 'Logout failed',{position:'top-center',autoClose:3000})
       })
    }
    function dashboard(){
        navigate('/admin/dashboard')
    }
  return (
  <>
    <div className={`overlay ${show?'show':''}`} onClick={()=>setShow(false)}>
        
    </div>
    <div className='dashboard-container'>
        <div className="profile-header" onClick={()=>setShow(!show)}>
             
        <img 
         src={user.avatar.url?user.avatar.url:'/images/profile.png'} alt="Profile Picture" className='profile-avatar' />
        <span className="profile-name">{user.name||'User'}</span>
        </div>
       { show&& <div  className="menu-options">
           {
           options.map((item)=>(
               <button key={item.name} onClick={item.funcName} className={`menu-option-btn ${item.isCart?(cartItems.length>0?'cart-not-empty':''):''} `}>{item.name}</button>
               
            ))
        }

            </div>}
    </div>
  </>
  )
}

export default UserDashboard
