import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../models/userModel.js";
import handleError from "../utlis/handleError.js";
import { sendToken } from "../utlis/jwtToken.js";

export const registerUser=handleAsyncError(async(req,res,next)=>{

    const{name,email,password}=req.body
   const user = await User.create({name,
    email,
    password,
    avatar:{
        public_id:'temp_id',
        url:'temp_url'
    }})
   if(!user){
   return next(new handleError('user creation failed',400))
   }
//    const token = user.getJwtToken()
//    res.status(201).json({
//     success:true,
//     user,
//     token
//    })
sendToken(user,201,res)


})

export const loginUser=handleAsyncError(async(req,res,next)=>{
    const{email,password} = req.body
    if(!email || !password){
        return next(new handleError('Email or password cannot be empty',400))
    }
    const existingUser = await User.findOne({email}).select('+password')
    if(!existingUser){
        return next(new handleError('Invalid email or password',401))
    }
    const isPasswordValid = await existingUser.verifyPassword(password)
    if(!isPasswordValid){
        return next(new handleError('Invalid email or password',401))
    }
    // const token = existingUser.getJwtToken()
    // res.status(200).json({
    //     success:true,
    //     user:existingUser,
    //     token
    // })
    sendToken(existingUser,200,res)

})

export const logout=handleAsyncError(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:'Logged out successfully'
    })
})

export const resetPassword=handleAsyncError(async(req,res,next)=>{
    console.log('reset password')
    const user = await User.findById(req.user.id).select('+password')
    req.user.password = req.body.password
    await req.user.save()
    
    res.status(200).json({
        success:true,
        user
    })
    

})