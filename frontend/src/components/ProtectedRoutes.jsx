import React from 'react'
import { useSelector } from 'react-redux'
import Loader from './Loader'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
    const{isAuthenticated,loading}=useSelector(state=>state.user)
    if(loading){
        return <Loader/>
    }
    if(!isAuthenticated){
        return <Navigate to='/login'/>
    }
  return children
}

export default ProtectedRoutes
