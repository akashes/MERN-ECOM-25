import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/products/productSlice.js'
import userReducer from '../features/user/userSlice.js'
import cartReducer from '../features/cart/cartSlice.js'
const store = configureStore({
    reducer:{
        product:productReducer,
        user:userReducer,
        cart:cartReducer

    }
})
export default store