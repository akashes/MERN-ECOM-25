import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/products/productSlice.js'
import userReducer from '../features/user/userSlice.js'
const store = configureStore({
    reducer:{
        product:productReducer,
        user:userReducer

    }
})
export default store