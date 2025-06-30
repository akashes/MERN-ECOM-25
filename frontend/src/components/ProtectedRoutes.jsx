import React from 'react'
import { useSelector } from 'react-redux'
import Loader from './Loader'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children,adminOnly=false}) => {
    const{isAuthenticated,loading,user}=useSelector(state=>state.user)
    if(loading){
        return <Loader/>
    }
    if(!isAuthenticated){
        return <Navigate to='/login'/>
    }
    if(adminOnly && user.role!=='admin'){
        return <Navigate to='/'/>
    }
  return children
}

export default ProtectedRoutes
