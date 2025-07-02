import React from 'react'
import '../AdminStyles/UpdateRole.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getSingleUser, removeErrors, updateUserRole } from '../features/admin/adminSlice'
import { toast } from 'react-toastify'
import { removeSuccess } from '../features/products/productSlice'
const UpdateRole = () => {
    const {userId}=useParams()
    console.log(userId)

    const {user,success,loading,error}=useSelector(state => state.admin)
    console.log(user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const[formData,setFormData]=React.useState({
        name:'',
        email:'',
        role:''
    })
    const{name,email,role}=formData

    const handleUpdateRoleSubmit=(e)=>{
        e.preventDefault()
        
            dispatch(updateUserRole({userId,role})).then((action)=>{
                if(action.type==='admin/updateUserRole/fulfilled'){
                    toast.success('User role updated successfully!',{
                        position:'top-center',
                        autoClose:3000
                    })
                    setTimeout(() => {
                    navigate('/admin/users');
                    dispatch(removeSuccess());
                    }, 3000);


                }
            })
        

    }

    useEffect(() => {
        if(userId){
            console.log('calling getSingleUser thunk')

            dispatch(getSingleUser(userId))
        }
    }, [dispatch,userId]);

    useEffect(()=>{
       if(user){
         setFormData({
            name:user?.name || '',
            email:user?.email || '',
            role:user?.role || ''
        })
       }

    },[user,dispatch])
    useEffect(() => {
      if(error){
        toast.error(error,{position:'top-center',autoClose:3000})
        dispatch(removeErrors())
      }
    }, [dispatch,error]);
  return (
   <>
   <Navbar/>
   <PageTitle title='Update User Role'/>
   <div className="page-wrapper">
    <div className="update-user-role-container">
        <h1>Update User Role</h1>
        <form  className="update-user-role-form" onSubmit={handleUpdateRoleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name </label>
                <input type="text" name="name" id="name" readOnly
                value={name} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email </label>
                <input type="email" name="email" id="email" readOnly
                value={email} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="role">Role </label>
                <select
                value={role} onChange={(e) => setFormData({...formData,role:e.target.value})}
                    
                name="role" id="role" required>
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button className="btn btn-primary">{loading?'Updating...':'Update'}</button>
        </form>
    </div>
   </div>

   <Footer/>
   </>
  )
}
export default UpdateRole

