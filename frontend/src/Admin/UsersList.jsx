import React from 'react'
import '../AdminStyles/UsersList.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Delete, Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { clearMessage, deleteUser, fetchUsers, removeErrors } from '../features/admin/adminSlice'
import PageTitle from '../components/PageTitle'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'



const UsersList = () => {

    const{users,loading,error,message}=useSelector(state=>state.admin)
    console.log(users)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    const handleDeleteUser=(userId)=>{
        const confirm = window.confirm('Are you sure you want to delete this user?')
        if(confirm){

            dispatch(deleteUser(userId))
            setTimeout(() => {
                
                navigate('/admin/dashboard')
            }, 2000);

        }

    }


    useEffect(()=>{

        dispatch(fetchUsers())
    },[dispatch])
    useEffect(()=>{
        if(error){
            toast.error(error,{position:'top-center',autoClose:3000})
            dispatch(removeErrors())
        }
        if(message){
            toast.success(message,{position:'top-center',autoClose:3000})
            dispatch(clearMessage())
        }


    },[dispatch,error,message])

  return (
    <>
    {
        loading ? <Loader/> :     <>
    <Navbar/>
    <PageTitle title='Users List'/>
    <div className="usersList-container">
        <h1 className="usersList-title">All Users</h1>
        <div className="usersList-table-container">
            <table className="usersList-table">
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user,index)=>(
                            <tr key={user._id}>
                        <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                            <Link to={`/admin/user/${user._id}`} className='action-icon edit-icon'><Edit/></Link>
                            <button onClick={()=>handleDeleteUser(user._id)} className='action-icon delete-icon'>  <Delete/> </button>
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

export default UsersList
