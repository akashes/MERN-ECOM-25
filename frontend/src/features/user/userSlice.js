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

const loadUser = createAsyncThunk('user/loadUser',async(_,{rejectWithValue})=>{
    try {
        const{data}=await axios.get('/api/v1/profile')
        return data
        
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to load user. please try again later')
    }
})
const logout=createAsyncThunk('user/logout',async(_,{rejectWithValue})=>{
    try {

       const {data}=await axios.get('/api/v1/logout',{withCredentials:true})
       return data
        
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to logout.')
        
    }
})

const updateProfile = createAsyncThunk('user/updateProfile',async(userData,{rejectWithValue})=>{
    try {
        let config={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }

       const {data}=await axios.put('/api/v1/profile/update',userData,config)
       return data

    } catch (error) {
        return rejectWithValue(error.response?.data || {message:'Failed to update profile. please try again later'})
    }
})
const updatePassword = createAsyncThunk('user/updatePassword',async(formData,{rejectWithValue})=>{
    try {
        console.log('inside update password slice')
        console.log(formData)
        const config={
            'Content-Type':'application/json'
        }
     const{data}=   await axios.put('/api/v1/password/update',formData,config)
     console.log(data)
     return data
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to update password. please try again later')
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
        message:null

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
            state.error = action.payload?.message || 'Login failed. please try again later'
            state.user=null,
            state.isAuthenticated=false
        }),
          //loading user
        builder.addCase(loadUser.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(loadUser.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null,
            state.user=action.payload?.user || null ,
            state.isAuthenticated=Boolean(action.payload?.user)
        })
        .addCase(loadUser.rejected,(state,action)=>{
            state.loading=false,
            state.error = action.payload?.message || 'Failed to load user.'
            state.user=null,
            state.isAuthenticated=false
        })
          //logout user
        builder.addCase(logout.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null,
            state.user= null ,
            state.isAuthenticated=false
        })
        .addCase(logout.rejected,(state,action)=>{
            state.loading=false,
            state.error = action.payload?.message || 'Failed to load user.'
            // state.user=null,
            // state.isAuthenticated=false
        })
          //update userProfile
        builder.addCase(updateProfile.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null,
            state.user= action.payload?.user || null ,
            state.success=action.payload?.success
            state.message=action.payload?.message
        })
        .addCase(updateProfile.rejected,(state,action)=>{
            state.loading=false,
            state.error = action.payload?.message || 'Failed to update profile.'
            // state.user=null,
            // state.isAuthenticated=false
        })
        //update user password
        builder.addCase(updatePassword.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(updatePassword.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null,
            state.success=action.payload?.success
        })
        .addCase(updatePassword.rejected,(state,action)=>{
            state.loading=false,
            state.error = action.payload || 'Failed to update password.'
        
        })
    }
})


export {register,login,loadUser,logout,updateProfile,updatePassword}
export const  {removeErrors,removeSuccess} = userSlice.actions
export default userSlice.reducer