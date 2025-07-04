import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'


const INITIAL_STATE ={
    products:[],
    // success:false,
    loading:false,
    error:null,
    product:{},
    deleting:{},
    users:[],
    user:{},
    message:null,
    orders:[],
    totalAmount:0,
    order:{},
    reviews:[]
}



// fetch all products
export const fetchAdminProducts = createAsyncThunk('admin/fetchAdminProducts',async(_,{rejectWithValue})=>{
    try {
        const {data}=await axios.get('/api/v1/admin/products')
        return data
        
    } catch (error) {
        return rejectWithValue(error.response?.data|| 'Error while Fetching the products')
    }
})

//create a product
export const createProduct = createAsyncThunk('admin/createProduct',async(productData,{rejectWithValue})=>{
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const {data} = await axios.post('/api/v1/admin/products',productData,config)
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error while creating the product')
    }
})


//update product
export const updateProduct = createAsyncThunk('admin/updateProduct',async({id,formData},{rejectWithValue})=>{
    try {
        const config = {
            
            'Content-Type':'multipart/form-data'
        }
        const {data}=await axios.put(`/api/v1/admin/products/${id}`,formData,config)
        return data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data || 'Failed to update Product')
    }
})

export const deleteProduct = createAsyncThunk('admin/deleteProduct',async(id,{rejectWithValue})=>{

    try {
        const{data} = await axios.delete(`/api/v1/admin/products/${id}`)
        return {id}
    } catch (error) {
        return rejectWithValue(error.response?.message|| 'Failed to delete Product')
    }
})

//fetch all users
export const fetchUsers = createAsyncThunk('admin/fetchUsers',async(_,{rejectWithValue})=>{
    console.log('inside fetch users thunk')
    try {
        const {data}=await axios.get('/api/v1/admin/users')
        return data
    } catch (error) {
        return rejectWithValue(error.response?.message|| 'Failed to fetch all Users data')
    }
})

// fetch User
export const getSingleUser =createAsyncThunk('admin/getSingleUser',async(id,{rejectWithValue})=>{
    console.log('inside get single user thunk')
    try {
        const{data}=await axios.get(`/api/v1/admin/users/${id}`)
        console.log('inside get single user thunk')
        console.log(data)
        return data
    } catch (error) {
        return rejectWithValue(error.response?.message || 'Failed to fetch User data')
    }
})

export const updateUserRole = createAsyncThunk('admin/updateUserRole',async({userId,role},{rejectWithValue})=>{
    try {
        const {data} = await axios.put(`/api/v1/admin/users/${userId}`,{role})
        return data
    } catch (error) {
        return rejectWithValue(error.response?.message || 'Failed to update User role')
    }
})

// delete user
export const deleteUser = createAsyncThunk('admin/deleteUser',async(userId,{rejectWithValue})=>{
    try {
        const{data}=await axios.delete(`/api/v1/admin/users/${userId}`)
        return data
    } catch (error) {
        return rejectWithValue(error.response?.message||'Failed to delete User')
    }
})

//fetch all orders
export const fetchAllOrders=createAsyncThunk('admin/fetchAllOrders',async(_,{rejectWithValue})=>{
    try {
        const {data}=await axios.get('/api/v1/admin/orders')
        console.log(data)
        return data
    } catch (error) {
        return rejectWithValue(error.response?.message || 'Failed to fetch all orders')
    }
})

export const deleteOrder=createAsyncThunk('admin/deleteOrder',async(orderId,{rejectWithValue})=>{
    try {
        const {data}=await axios.delete(`/api/v1/admin/orders/${orderId}`)
        console.log(data)
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to delete Order')
    }
})

export const updateOrderStatus=createAsyncThunk('admin/updateOrderStatus',async({orderId,status},{rejectWithValue})=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data}=await axios.put(`/api/v1/admin/orders/${orderId}`,{status},config)
        return data
        
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to Update Order status')
    }
})
export const fetchProductReviews=createAsyncThunk('admin/fetchProductReviews',async(productId,{rejectWithValue})=>{
    try {
   
        const {data}=await axios.get(`/api/v1/admin/reviews?id=${productId}`)
        return data
        
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch product reviews')
    }
})
export const deleteReview=createAsyncThunk('admin/deleteReview',async({productId,reviewId},{rejectWithValue})=>{
    try {
   
        const {data}=await axios.delete(`/api/v1/admin/reviews?productId=${productId}&id=${reviewId}`)
        return data
        
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to delete product review')
    }
})

const adminSlice = createSlice({

    name:"admin",
    initialState:INITIAL_STATE,
    reducers:{
        removeErrors:(state)=>{
            state.error=null
        },
        removeSuccess:(state)=>{
            state.success=false
        },
        clearMessage:(state)=>{
            state.message=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAdminProducts.pending,(state)=>{
            state.loading = true
            state.error=null
        })
        .addCase(fetchAdminProducts.fulfilled,(state,action)=>{
            state.loading = false,
            state.error = null
            state.products = action.payload.products
        })
        .addCase(fetchAdminProducts.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload?.message || 'Error while Fetching the products' 
        })
        builder.addCase(createProduct.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(createProduct.fulfilled,(state,action)=>{
            state.loading = false
            state.error = null
            state.success = action.payload.success
            state.products.push(action.payload.product)
        })
        .addCase(createProduct.rejected,(state,action)=>{       
            state.loading = false
            state.error = action.payload?.message || 'Error while creating the product'
        })
        builder.addCase(updateProduct.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.loading = false
            state.error = null
            state.success = action.payload.success
            state.product = action.payload.product
        })
        .addCase(updateProduct.rejected,(state,action)=>{       
            state.loading = false
            state.error = action.payload?.message || 'Error while Updating the product'
        })
        builder.addCase(deleteProduct.pending,(state,action)=>{
            const productId = action.meta.arg
            state.deleting[productId]=true;
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{

            const productId = action.payload.id
            state.deleting[productId]=false
            state.products = state.products.filter(product=> product._id !== productId)
        })
        .addCase(deleteProduct.rejected,(state,action)=>{    
            const productId = action.meta.arg
            state.deleting[productId]=false

            state.error = action.payload?.message || 'Product deletion failed!'
        })
        
        builder.addCase(fetchUsers.pending,(state,action)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{

            state.loading = false
            state.users = action.payload.users
        })
        .addCase(fetchUsers.rejected,(state,action)=>{    
            state.loading=false


            state.error = action.payload?.message || 'Failed to fetch Users!'
        })
        builder.addCase(getSingleUser.pending,(state,action)=>{
            state.loading=true
            state.error=null
        })
        .addCase(getSingleUser.fulfilled,(state,action)=>{

            state.loading = false
            state.user = action.payload.user
            state.error = null
        })
        .addCase(getSingleUser.rejected,(state,action)=>{    
            state.loading=false
            state.error = action.payload?.message || 'Failed to fetch User!'
        })
          builder.addCase(updateUserRole.pending,(state,action)=>{
            state.loading=true
            state.error=null
        })
        .addCase(updateUserRole.fulfilled,(state,action)=>{

            state.loading = false

            state.success = action.payload.success
            state.error = null
        })
        .addCase(updateUserRole.rejected,(state,action)=>{    
            state.loading=false
            state.error = action.payload?.message || 'Failed to Update User Role!'
        })
          builder.addCase(deleteUser.pending,(state,action)=>{
            state.loading=true
            state.error=null
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{

            state.loading = false

            state.success = action.payload.success
            state.users = state.users.filter(user => user._id !== action.meta.arg)
            state.error = null
            state.message = action.payload.message
        })
        .addCase(deleteUser.rejected,(state,action)=>{    
            state.loading=false
            state.error = action.payload?.message || 'Failed to delete User'
        })

         builder.addCase(fetchAllOrders.pending,(state,action)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchAllOrders.fulfilled,(state,action)=>{
            state.loading = false
            state.orders = action.payload.orders
            state.totalAmount = action.payload.total
        })
        .addCase(fetchAllOrders.rejected,(state,action)=>{    
            state.loading=false
            state.error = action.payload?.message || 'Failed to fetch orders'
        })
         builder.addCase(deleteOrder.pending,(state,action)=>{
            state.loading=true
            state.error=null
        })
        .addCase(deleteOrder.fulfilled,(state,action)=>{
            state.loading = false
            state.message = action.payload.message
            state.success = action.payload.success
            // state.orders = state.orders.filter(order => order._id !== action.meta.arg)
        })
        .addCase(deleteOrder.rejected,(state,action)=>{    
            state.loading=false
            state.error = action.payload?.message || 'Failed to Delete order'
        })
         builder.addCase(updateOrderStatus.pending,(state,action)=>{
            state.loading=true
            state.error=null
        })
        .addCase(updateOrderStatus.fulfilled,(state,action)=>{
            state.loading = false
            state.success = action.payload.success
            state.order = action.payload.order

        })
        .addCase(updateOrderStatus.rejected,(state,action)=>{    
            state.loading=false
            state.error = action.payload?.message || 'Failed to update order status'
        })
         builder.addCase(fetchProductReviews.pending,(state,action)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchProductReviews.fulfilled,(state,action)=>{
            state.loading = false
            state.reviews = action.payload.reviews

        })
        .addCase(fetchProductReviews.rejected,(state,action)=>{    
            state.loading=false
            state.error = action.payload?.message || 'Failed to fetch Product Reviews'
        })
         builder.addCase(deleteReview.pending,(state,action)=>{
            state.loading=true
            state.error=null
        })
        .addCase(deleteReview.fulfilled,(state,action)=>{
            const {productId,reviewId}=action.meta.arg
            //removing deleted review
            state.reviews = state.reviews.filter(r=>r._id!==reviewId)
            //update no of reviews for the product
            const productIndex = state.products.findIndex(p=>p._id===productId)
            if(productIndex!==-1 && state.products[productIndex].numOfReviews>0){
                state.products[productIndex].numOfReviews-=1
            }
            state.loading = false
            state.success = action.payload.success
            state.message = action.payload.message

        })
        .addCase(deleteReview.rejected,(state,action)=>{    
            state.loading=false
            state.error = action.payload?.message || 'Failed to delete Product Review'
        })
    }
})

export const {removeErrors,removeSuccess,clearMessage}= adminSlice.actions
export default adminSlice.reducer