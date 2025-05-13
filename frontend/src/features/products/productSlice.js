import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState={
    products:[],
    productCount:0,
    loading:false,
    error:null,
    product:null
}
const fetchProducts=createAsyncThunk('product/fetchProducts',async(_,{rejectWithValue})=>{
    try {
        const link ='/api/v1/products'
        const {data} = await axios.get(link)
        return data
   
        
    } catch (error) {
        return rejectWithValue(error.response?.data || 'An error occurred' )
    }
    

})

//get single product
const getProduct = createAsyncThunk('product/getProduct',async(id,{rejectWithValue})=>{
    try {
        const link = `/api/v1/product/${id}`
        const {data} = await axios.get(link)
        return data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data || 'An error occurred' )
    }
})

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
        removeErrors:(state)=>{
            state.error = null
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading=true
            state.error = null
        }),
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            console.log('fulfulled action payload',action.payload.products)
            state.loading=false,
            state.products=action.payload.products
            state.productCount=action.payload.productCount
            state.error=null
        }),
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.error = action.payload || 'something went wrong'
            state.loading = false
        })
        builder.addCase(getProduct.pending,(state)=>{
            state.loading=true
            state.error = null
        }),
        builder.addCase(getProduct.fulfilled,(state,action)=>{
            state.loading=false,
            state.product=action.payload.product
            state.error=null
        }),
        builder.addCase(getProduct.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload || 'something went wrong'
        })

    }
})
export {fetchProducts,getProduct}
export const {removeErrors} = productSlice.actions
export default productSlice.reducer