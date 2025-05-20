import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'




//registration api

const register = createAsyncThunk('user/register',async(userData,{rejectWithValue})=>{
    console.log('inside user slice')
    console.log({userData})
    // for(let val of userData.entries()){
    //     console.log(val)
    // }
    try {
        const config={
            headers:{
                'Content-Type':'multipart/form-data'

            }
        }
       const {data} = await axios.post('/api/v1/register',userData,config)
       console.log('registration data',data)
       return data
    } catch (error) {
                    console.log(error.response)
        return rejectWithValue(error.response?.data || 'Registration failed. please try again later')
        
    }

})

const login = createAsyncThunk('user/login',async({email,password},{rejectWithValue})=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
       const {data} = await axios.post('/api/v1/login',{email,password},config)
       console.log('login data',data)
       return data

    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data || 'Login failed. please try again later')
    }
    
})

const userSlice=createSlice({
    name:'user',
    initialState:{
        user:null,
        loading:false,
        error:null,
        success:false,
        isAuthenticated:false,

    },
    reducers:{
        removeErrors:(state)=>{
            state.error = null
        },
        removeSuccess:(state)=>{
            state.success = null
        }
    },
    extraReducers:(builder)=>{
        //registration cases
        builder.addCase(register.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null,
            state.success=action.payload.success,
            state.user=action.payload?.user || null ,
            state.isAuthenticated=Boolean(action.payload?.user)
        })
        .addCase(register.rejected,(state,action)=>{
            state.loading=false,
            state.error = action.payload?.message || 'Registration failed. please try again later'
            state.user=null,
            state.isAuthenticated=false
        })
        //login cases //same as register logic ,no change
        builder.addCase(login.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null,
            state.success=action.payload.success,
            state.user=action.payload?.user || null ,
            state.isAuthenticated=Boolean(action.payload?.user)
            console.log(state.user)
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false,
            state.error = action.payload?.message || 'Registration failed. please try again later'
            state.user=null,
            state.isAuthenticated=false
        })
    }
})
export {register,login}
export const  {removeErrors,removeSuccess} = userSlice.actions
export default userSlice.reducer