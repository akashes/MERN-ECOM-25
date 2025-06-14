import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE={
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    loading:false,
    success:false,
    error:null,
    message:null,
    removingId:null

}

//add items to cart

export const addItemsToCart = createAsyncThunk('cart/addItemsToCart',async({productId,quantity},{rejectWithValue})=>{
    try {
    
        const {data}=await axios.get(`/api/v1/products/${productId}`)
        console.log('add items to cart ',data)
        return {
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.image[0].url,
            stock:data.product.stock,
            quantity
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to add to cart. please try again later')
        
    }
})







const cartSlice = createSlice({
    name:'cart',
    initialState:INITIAL_STATE,
    reducers:{
        // removeSuccess:(state)=>{
        //     state.success = false
        // },
        removeError:(state)=>{
            state.error = null
        },
        removeMessage:(state)=>{
            state.message = null
        },
        removeItemFromCart:(state,action)=>{
            // console.log('inside remove item reducer')
            // console.log(action.payload.productId)
            // const newCart = state.cartItems.filter(i=>i.product!==action.payload.productId)
            // console.log(newCart)
            // state.cartItems=newCart
            // localStorage.setItem('cartItems',JSON.stringify(newCart))

            state.removingId = action.payload
            state.cartItems = state.cartItems.filter(i=>i.product!==action.payload)
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
            state.removingId = null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addItemsToCart.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(addItemsToCart.fulfilled,(state,action)=>{
            const item = action.payload
            const existingItem = state.cartItems.find((i)=>i.product===item.product)
            console.log(existingItem)
            if(existingItem){

                existingItem.quantity=item.quantity
                state.message = `${item.name} is updated in Cart successfully`
               
            }else{
                state.cartItems.push(item)
                state.message = `${item.name} is added to Cart successfully`    
            } 
            
            
            state.loading = false
            state.success = true
            state.error = null
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        })
        .addCase(addItemsToCart.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload?.message || 'An Error occurred'
        })
      
    }
})


export const{removeMessage,removeError,removeItemFromCart} = cartSlice.actions
export default cartSlice.reducer