import User from "../models/userModel.js";
import handleAsyncError from "./handleAsyncError.js";
import jwt from 'jsonwebtoken'

export const verifyUserAuth=handleAsyncError(async(req,res,next)=>{
    const {token} = req.cookies

    if(!token){
        return next(new Error('Login to access this resource',401))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()


    
})


export const roleBasedAccess=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new Error(`Role -${req.user.role } is not allowed to access this resource}`,403))
        }
        next()
    }
}