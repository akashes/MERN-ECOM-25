import React, { Suspense } from 'react'
import {Routes,BrowserRouter as Router , Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'

const Home = React.lazy(() => import('./pages/Home'))
const App = () => {
  return (
    <Router>
      <Suspense fallback={<h1>Loading</h1>}>
       <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/product/:id' element={<ProductPage/>} />
  </Routes>
      </Suspense>
    </Router>
  )
}

export default App
