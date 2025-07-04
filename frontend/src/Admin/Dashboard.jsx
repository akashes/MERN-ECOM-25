import React from 'react'
import '../AdminStyles/Dashboard.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import { AddBox, AttachMoney, CheckCircle, Dashboard as DashboardIcon, Error, Instagram, LinkedIn, People, ShoppingCart, Star, YouTube } from '@mui/icons-material'
import { Inventory } from '@mui/icons-material'
import { Link } from 'react-router-dom'
const Dashboard = () => {
  return (
    <>
    <Navbar/>
    <PageTitle title='Admin Dashboard' />
    <div className="dashboard-container">
        <div className="sidebar">
            <div className="logo">
                <DashboardIcon className='logo-icon'/>
                Admin Dashboard
            </div>
            <nav className="nav-menu">
                <div className="nav-section">
                    <h3>Products</h3>
                    <Link to='/admin/products' >
                    <Inventory className='nav-icon' />
                    All Products
                    </Link>
                    <Link to='/admin/products/create' >
                    <AddBox className='nav-icon' />
                    Create Products
                    </Link>
                </div>
                <div className="nav-section">
                    <h3>Users</h3>
                    <Link to='/admin/users' >
                    <People className='nav-icon' />
                    All Users
                    </Link>
                    
                </div>
                <div className="nav-section">
                    <h3>Orders</h3>
                    <Link to='/admin/orders' >
                    <ShoppingCart className='nav-icon' />
                    All Orders
                    </Link>
                    
                </div>
                <div className="nav-section">
                    <h3>Reviews</h3>
                    <Link to='/admin/reviews' >
                    <Star className='nav-icon' />
                    All Reviews
                    </Link>
                    
                </div>
            </nav>
        </div>

        <div className="main-content">
            <div className="stats-grid">
                <div className="stat-box">
                    <Inventory className='icon'/>
                    <h3>Total Products</h3>
                    <p>4</p>
                </div>
                <div className="stat-box">
                    <ShoppingCart className='icon'/>
                    <h3>Total Orders</h3>
                    <p>5</p>
                </div>
                <div className="stat-box">
                    <Star className='icon'/>
                    <h3>Total Reviews</h3>
                    <p>15</p>
                </div>
                <div className="stat-box">
                    <AttachMoney className='icon'/>
                    <h3>Total Revenue</h3>
                    <p>1500</p>
                </div>
                <div className="stat-box">
                    <Error className='icon'/>
                    <h3>Out of Stock</h3>
                    <p>4</p>
                </div>
                <div className="stat-box">
                    <CheckCircle className='icon'/>
                    <h3>In Stock</h3>
                    <p>6</p>
                </div>
            </div>
            <div className="social-stats">
                <div className="social-box instagram">
                    <Instagram />
                    <h3>Instagram</h3>
                    <p>123k Followers</p>
                    <p>12 posts</p>
                </div>
                <div className="social-box linkedIn">
                    <LinkedIn />
                    <h3>LinkedIn</h3>
                    <p>54k Followers</p>
                    <p>7 posts</p>
                </div>
                <div className="social-box youtube">
                    <YouTube />
                    <h3>YouTube</h3>
                    <p>46k Followers</p>
                    <p>500 posts</p>
                </div>
            </div>
        </div>
    </div>

    

    </>
  )
}

export default Dashboard
