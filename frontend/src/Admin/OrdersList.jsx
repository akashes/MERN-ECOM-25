import React, { useEffect } from 'react'
import '../AdminStyles/OrdersList.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, deleteOrder, fetchAllOrders, removeErrors, removeSuccess } from '../features/admin/adminSlice'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'

import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // shipped
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'; // processing
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'; // on the way
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // delivered



const OrdersList = () => {
    const {orders,loading,error,message,success}=useSelector(state=>state.admin)
    const dispatch = useDispatch()

    const handleDeleteOrder=(orderId)=>{
        const confirm = window.confirm('Are you sure you want to delete this Order?')
        if(confirm){

            dispatch(deleteOrder(orderId))
        }



    }

 const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case 'processing':
      return <HourglassBottomIcon className="status-icon processing" />;
    case 'on the way':
      return <DirectionsRunIcon className="status-icon on-the-way" />;
    case 'shipped':
      return <LocalShippingIcon className="status-icon shipped" />;
    case 'delivered':
      return <CheckCircleIcon className="status-icon delivered" />;
    default:
      return null;
  }
};


    useEffect(()=>{

        dispatch(fetchAllOrders())
    },[dispatch])
    useEffect(() => {
      if(error){
        toast.error(error,{position:'top-center',autoClose:3000})
        dispatch(removeErrors())
      }
      if(success){
        toast.success(message,{position:'top-center',autoClose:3000})
        dispatch(removeSuccess())
        dispatch(clearMessage())
        dispatch(fetchAllOrders())
      }
    }, [dispatch,error,success,message]);


    if(orders && orders.length === 0 && !loading){
        return(
            <div className="no-orders-container">
                <p>No Orders Found</p>

            </div>
        )
    }
  return (
    <>
    {
        loading?<Loader/> :    <>
   <Navbar/>
   <PageTitle title='All Orders' />
   <div className="ordersList-container">
    <h1 className="ordersList-title">All Orders</h1>
    <div className="ordersList-table-container">
        <table className="ordersList-table">
            <thead>
                <tr>
                    <th>Sl No</th>
                    <th>Oder ID</th>
                    <th>Status</th>
                    <th>Total Price</th>
                    <th>Number of Items</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                   orders&& orders.map((order,index)=>(
                        <tr key={order._id}>
                    <td>{index+1}</td>
                    <td>{order._id}</td>
                    <td  className={`order-status ${order.orderStatus.toLowerCase()}`}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>

                        {getStatusIcon(order.orderStatus)} <span>{order.orderStatus}</span>
                        </div>
                        </td>
                    <td>{order.totalPrice.toFixed(2)}</td>
                    <td>{order.orderItems.length}</td>
                    <td>
                        <Link to={`/admin/order/${order._id}`} className='action-icon edit-icons'>
                        <Edit/>
                        </Link>
                        <button onClick={()=>handleDeleteOrder(order._id)} className='action-icon delete-icon'>
                            <Delete/>
                        </button>
                    </td>
                </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
   </div>
   <Footer/>
   </>
    }
    </>

  )
}

export default OrdersList
