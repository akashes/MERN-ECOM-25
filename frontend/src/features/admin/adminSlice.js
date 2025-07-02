import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'


const INITIAL_STATE ={
    products:[],
    // success:false,
    loading:false,
    error:null,
    product:{},
    deleting:{},
    users:[]
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
    try {
        const {data}=await axios.get('/api/v1/admin/users')
        return data
    } catch (error) {
        return rejectWithValue(error.response?.message|| 'Failed to fetch all Users data')
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

    }
})

export const {removeErrors,removeSuccess}= adminSlice.actions
export default adminSlice.reducer