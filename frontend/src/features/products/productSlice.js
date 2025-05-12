import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState={
    products:[],
    productCount:0,
    loading:false,
    error:null
}
const fetchProducts=createAsyncThunk('product/fetchProducts',async(_,{rejectWithValue})=>{
    try {
        console.log('inside fetchProducts')
        const link ='/api/v1/products'
        const {data} = await axios.get(link)
        console.log('response',data)
        return data
   
        
    } catch (error) {
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

    }
})
export {fetchProducts}
export const {removeErrors} = productSlice.actions
export default productSlice.reducer