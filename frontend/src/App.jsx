import React from 'react'
import Home from './pages/Home'
import {Routes,BrowserRouter as Router , Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
       <Routes>
    <Route path='/' element={<Home/>}/>
  </Routes>
    </Router>
  )
}

export default App
