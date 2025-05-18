import React, { Suspense } from 'react'
import {Routes,BrowserRouter as Router , Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import Products from './pages/Products'
import Register from './User/Register'
import Login from './User/Login'
const Home = React.lazy(() => import('./pages/Home'))
const App = () => {
  return (
    <Router>
      <Suspense fallback={<h1>Loading</h1>}>
       <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/product/:id' element={<ProductPage/>} />
    <Route path='/products' element={<Products/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login/>} />

  </Routes>
      </Suspense>
    </Router>
  )
}

export default App
