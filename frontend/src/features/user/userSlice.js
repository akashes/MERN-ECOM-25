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
        console.log('load user slice')
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

const forgotPassword =createAsyncThunk('user/forgotPassword',async(email,{rejectWithValue})=>{
    try {
        const config={
            'Content-Type':'application/json'
        }
     const {data}  = await axios.post('/api/v1/password/forgot',{email},config)
     console.log(data)
     return data
    } catch (error) {
        return rejectWithValue(error.response?.data|| {message:'Email sent Failed'})
    }
})

const resetPassword=createAsyncThunk('user/resetPassword',async({token,userData},{rejectWithValue})=>{

    try {
        const config={
            'Content-Type':'application/json'
        }
       const{data}= await axios.post(`/api/v1/reset/${token}`,userData,config)
       return data
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to reset password. please try again later')
        
    }
})
const userSlice=createSlice({
    name:'user',
    initialState:{
        user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
        loading:false,
        error:null,
        success:false,
        isAuthenticated:localStorage.getItem('isAuthenticated') ? JSON.parse(localStorage.getItem('isAuthenticated')) : false,
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
            //storing in local localStorage
            localStorage.setItem('user',JSON.stringify(state.user))
            localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated))
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

            //storing in local localStorage
            localStorage.setItem('user',JSON.stringify(state.user))
            localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated))
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

                        //storing in local localStorage
            localStorage.setItem('user',JSON.stringify(state.user))
            localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated))
        })
        .addCase(loadUser.rejected,(state,action)=>{
            state.loading=false,
            state.error = action.payload?.message || 'Failed to load user.'
            state.user=null,
            state.isAuthenticated=false

            if(action.payload?.statusCode===401){
                state.user = null
                state.isAuthenticated = false
                localStorage.removeItem('user')
                localStorage.removeItem('isAuthenticated')
            }
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

            localStorage.removeItem('user')
            localStorage.removeItem('isAuthenticated')
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
        //forgot user password
        builder.addCase(forgotPassword.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(forgotPassword.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null,
            state.success=action.payload?.success
            state.message=action.payload?.message
        })
        .addCase(forgotPassword.rejected,(state,action)=>{
            state.loading=false,
            state.error = action.payload?.message || 'Email sent Failed.'
        
        })
        //reset user password
        builder.addCase(resetPassword.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(resetPassword.fulfilled,(state,action)=>{
            state.loading=false,
            state.error=null,
            state.success=action.payload?.success 
            state.user=null,
            state.isAuthenticated=false
        })
        .addCase(resetPassword.rejected,(state,action)=>{
            state.loading=false,
            state.error = action.payload?.message || 'Password reset Failed.'
        
        })
    }
})


export {register,login,loadUser,logout,updateProfile,updatePassword,forgotPassword,resetPassword}
export const  {removeErrors,removeSuccess} = userSlice.actions
export default userSlice.reducer