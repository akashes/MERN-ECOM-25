import React, { Suspense, useEffect } from 'react'
import {Routes,BrowserRouter as Router , Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import Products from './pages/Products'
import Register from './User/Register'
import Login from './User/Login'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './features/user/userSlice'
import UserDashboard from './User/UserDashboard'
import Profile from './User/Profile'
import ProtectedRoutes from './components/ProtectedRoutes'
import UpdateProfile from './User/UpdateProfile'
import UpdatePassword from './User/UpdatePassword'
import ForgotPassword from './User/ForgotPassword'
import ResetPassword from './User/ResetPassword'
import Cart from './Cart/Cart'
import Shipping from './Cart/Shipping'
import OrderConfirm from './Cart/OrderConfirm'
import Payment from './Cart/Payment'
const Home = React.lazy(() => import('./pages/Home'))
const App = () => {
  const{user,isAuthenticated}=useSelector(state=>state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    if(isAuthenticated){

      dispatch(loadUser())
    }
  },[dispatch])
  console.log(isAuthenticated,user)
  return (
    <Router>
      <Suspense fallback={<h1>Loading</h1>}>
       <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/product/:id' element={<ProductPage/>} />
    <Route path='/products' element={<Products/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login/>} />
    
    {/* <Route path='/profile' element={<ProtectedRoutes element={<Profile/>}   />} /> */}
    <Route path='/profile' element={<ProtectedRoutes><Profile/></ProtectedRoutes>} />
    <Route path='/profile/update' element={<ProtectedRoutes><UpdateProfile/></ProtectedRoutes>} />
    <Route path='/profile/password/update' element={<ProtectedRoutes><UpdatePassword/></ProtectedRoutes>} />

    
    <Route path='/password/forgot' element={<ForgotPassword/>} />
    <Route path='/reset/:token' element={<ResetPassword/>} />

    <Route path='/cart' element={<Cart/>} />
    <Route path='/shipping' element={<ProtectedRoutes><Shipping/></ProtectedRoutes>} />
    <Route path='/order/confirm' element={<ProtectedRoutes><OrderConfirm/></ProtectedRoutes>} />
    <Route path='/process/payment' element={<ProtectedRoutes><Payment/></ProtectedRoutes>} />


    

  </Routes>
  {isAuthenticated && <UserDashboard user={user} />}
      </Suspense>
    </Router>
  )
}

export default App
