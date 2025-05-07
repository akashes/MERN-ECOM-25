import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../models/userModel.js";
import handleError from "../utlis/handleError.js";
import { sendToken } from "../utlis/jwtToken.js";
import { sendEmail } from "../utlis/sendEmail.js";
import crypto from 'crypto'

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


//forgot password 
export const requestPasswordReset=handleAsyncError(async(req,res,next)=>{
    const user =await User.findOne({email:req.body.email})
    if(!user){
        return next(new handleError('User not found',404))
    }
    let resetToken;
    try {
  
        resetToken = user.generatePasswordResetToken()
        console.log(resetToken)
        await user.save({validateBeforeSave:false})

    } catch (error) {
        console.log(error)
        return next(new handleError('Could not save reset token , please try again later',500))
        
    }
    const resetPasswordURL = `http://localhost:8000/api/v1/reset/${resetToken}`;
    const message = `
      <p>Use the following link to reset your password:</p>
      <a href="${resetPasswordURL}" target="_blank">${resetPasswordURL}</a>
      <p>This link will expire in 30 minutes.</p>
      <p>If you didn’t request a password reset, please ignore this email.</p>
    `;
    
    try {
        await sendEmail({
            email:user.email,
            subject:'Password reset request',
            message
        })
        res.status(200).json({
            success:true,
            message:`Email is sent to ${user.email} successfully`
        })
        
    } catch (error) {
        console.log(error)
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({validateBeforeSave:false})
        return next(new handleError('Email could not be sent , please try again later',500))
        
    }


})

//reset password
export const resetPassword=handleAsyncError(async(req,res,next)=>{

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
        return next(new handleError('Invalid or expired reset token',400))
    }
  
    const{password,confirmPassword} = req.body
    if(password !== confirmPassword){
        return next(new handleError('Password does not match',400))
    }
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()
    sendToken(user,200,res)
})