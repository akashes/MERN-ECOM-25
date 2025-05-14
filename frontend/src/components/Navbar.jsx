import React, { useRef, useState } from 'react'
import '../componentStyles/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import { ShoppingCart } from '@mui/icons-material'
import  PersonAddIcon from '@mui/icons-material/PersonAdd'
import  CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import '../pageStyles/Search.css'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu=()=>setIsMenuOpen(!isMenuOpen)

    const[isSearchOpen,setIsSearchOpen]=useState(false)
    const[searchQuery,setSearchQuery]=useState("")
    const inputRef = useRef()
    const toggleSearch =()=>{

        setIsSearchOpen(!isSearchOpen)
        inputRef.current.focus()
    }
    

    const navigate = useNavigate()

    const isAuthenticated = true

    const handleSearchSubmit=(e)=>{
        e.preventDefault()
        if(searchQuery.trim()){
            navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`)
         
        }else{
            navigate('/products')
        }
           setIsSearchOpen(false)
            setSearchQuery("")
        
    }
  return (
    <nav className="navbar">
        <div className="navbar-container">
            <div className="navbar-logo">
                <Link to='/' onClick={()=>setIsMenuOpen(false)}>ShopEasy</Link>
            </div>
            <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                <ul>
                    <li  onClick={()=>setIsMenuOpen(false)} ><Link to='/home'>Home</Link></li>
                    <li><Link to='/products'>Products</Link></li>
                    <li><Link to='/about-us'>About Us</Link></li>
                    <li><Link to='/contact-us'>Contact Us</Link></li>
                </ul>
            </div>
            <div className="navbar-icons">
                <div className="search-container">
                    <form action="" className={`search-form ${isSearchOpen?'active':''}` } 
                    onSubmit={handleSearchSubmit}
                    >
                        <input
                        ref={inputRef}

                         type="text" className='search-input'
                        placeholder='search-products...'
                        value={searchQuery}
                        onChange={(e)=>setSearchQuery(e.target.value)}
                        />
                        <button type='button' onClick={toggleSearch} className="search-icon">
                            <SearchIcon focusable='false'/>
                        </button>
                    </form>

                </div>
                <div className="cart-container">
                    <Link to='/cart'>
                    <ShoppingCart className='icon'/>
                    <span className="cart-badge">6</span>
                        </Link>
                </div>
                {
                !isAuthenticated &&  <Link to='/register' className='register-link'><PersonAddIcon className='icon'/></Link>
                   
                }
                <div className="navbar-hamburger" onClick={toggleMenu}>
                    {
                        isMenuOpen?(
                            <CloseIcon className='icon'/>
                        ):(
                            <MenuIcon className='icon'/>
                        )
                    }
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
