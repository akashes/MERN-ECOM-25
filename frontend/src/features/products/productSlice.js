import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState={
    products:[],
    productCount:0,
    loading:false,
    error:null,
    product:null,
    resultsPerPage:4,
    totalPages:0,
    reviewSuccess:false,
    reviewLoading:false
}
const fetchProducts=createAsyncThunk('product/fetchProducts',async({keyword,page=1,category},{rejectWithValue})=>{
    
    try {
       
        let link = '/api/v1/products?page='+page
        if(category){
            link+=`&category=${category}`
        }
        if(keyword){
            link+=`&keyword=${keyword}`

            
        }
        console.log(link)
        // const link = keyword?`/api/v1/products?keyword=${encodeURIComponent(keyword)}&page=${page}`
        // :`/api/v1/products?page=${page}`
        const {data} = await axios.get(link)
        return data
   
        
    } catch (error) {
        return rejectWithValue(error.response?.data || 'An error occurred' )
    }
    

})

//get single product
const getProduct = createAsyncThunk('product/getProduct',async(id,{rejectWithValue})=>{
    try {
        const link = `/api/v1/products/${id}`
        const {data} = await axios.get(link)
        return data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data || 'An error occurred' )
    }
})

//create review
const createReview = createAsyncThunk('product/createReview',async({rating,comment,productId},{rejectWithValue})=>{
    console.log('inside create review thunk')
    console.log(rating,comment,productId)
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.put(`/api/v1/reviews`,{rating,comment,productId},config)
        return data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data || 'An error occurred while creating review')
    }
})


const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
        removeErrors:(state)=>{
            state.error = null
        },
        removeSuccess:(state)=>{
            state.reviewSuccess = false
        },
        resetProduct:(state)=>{
            state.product = null
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
            state.resultsPerPage=action.payload.resultsPerPage
            state.totalPages=action.payload.totalPages
            state.error=null

        }),
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.error = action.payload || 'something went wrong'
            state.loading = false
            state.products=[]
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
        }),
        builder.addCase(createReview.pending,(state)=>{
            state.reviewLoading = true
            state.error = null
        }),
        builder.addCase(createReview.fulfilled,(state,action)=>{
            state.reviewLoading = false
            state.reviewSuccess = true
            state.error = null
        }),
        builder.addCase(createReview.rejected,(state,action)=>{
            state.reviewLoading = false
            state.error = action.payload || 'something went wrong'
        })

    }
})
export {fetchProducts,getProduct,createReview}
export const {removeErrors,removeSuccess,resetProduct} = productSlice.actions
export default productSlice.reducer