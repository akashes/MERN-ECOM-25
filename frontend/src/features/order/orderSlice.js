import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
    success:false,
    loading:false,
    error:null,
    orders:[],
    order:{}
}

//creating order 
const createOrder = createAsyncThunk('order/createOrder',async(order,{rejectWithValue})=>{
    try {
        console.log('createing order slice')
        console.log(order)
        const config={
            headers:{ 
                'Content-Type':'application/json'
            }
        }
        const {data}=await axios.post('/api/v1/orders',order,config)
        console.log('order data',data)
        return data
        
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data || 'Failed to create order. please try again later')
        
    }

    
})


//get users all order details
const getAllMyOrders=createAsyncThunk('order/getAllMyOrders',async(_,{rejectWithValue})=>{
    try {
        const {data}=await axios.get('/api/v1/orders')
        console.log(data)
        return data
        
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data || 'Failed to get order details. please try again later')
    }
})

//get order Details
const getOrderDetails=createAsyncThunk('order/getOrderDetails',async(orderId,{rejectWithValue})=>{
    try {
        const {data}=await axios.get(`/api/v1/orders/${orderId}`)
        console.log(data)
        return data
        
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data || 'Failed to fetch Order Details')
    }
})




const orderSlice = createSlice({
    name:'order',
    initialState:INITIAL_STATE,
    reducers:{
          removeErrors:(state)=>{
            state.error = null
        },
        removeSuccess:(state)=>{
            state.success = null
        },
      

    },
    extraReducers:(builder)=>{
        builder.addCase(createOrder.pending,(state)=>{
            state.loading = true,
            state.error = null

        })
        .addCase(createOrder.fulfilled,(state,action)=>{
            state.loading = false,
            state.order = action.payload.order
            state.success = action.payload.success
            
        })
        .addCase(createOrder.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload?.message || 'Failed to create order. please try again later'


        }),


        //get all user orders

        builder.addCase(getAllMyOrders.pending,(state)=>{
            state.loading=true,
            state.error = null

        })
        .addCase(getAllMyOrders.fulfilled,(state,action)=>{
            state.loading=false,
            state.orders = action.payload.orders
            state.success=action.payload.success

        })
        .addCase(getAllMyOrders.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload?.message || 'Failed to fetch Orders'
        })
        //get single order detail

        builder.addCase(getOrderDetails.pending,(state)=>{
            state.loading=true,
            state.error = null

        })
        .addCase(getOrderDetails.fulfilled,(state,action)=>{
            state.loading=false,
            state.success=action.payload.success
            state.order = action.payload.order

        })
        .addCase(getOrderDetails.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload?.message || 'Failed to fetch Order Details'
        })

    }
})
export {createOrder,getAllMyOrders,getOrderDetails}
export const {removeErrors,removeSuccess}=orderSlice.actions
export default orderSlice.reducer