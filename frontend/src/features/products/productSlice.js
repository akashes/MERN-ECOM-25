import {createSlice} from '@reduxjs/toolkit'

const initialState={
    products:[],
    productCount:0,
    loading:false,
    error:null
}
const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
        removeErrors:(state)=>{
            state.error = null
        }

    }
})

export const {removeErrors} = productSlice.actions
export default productSlice.reducer