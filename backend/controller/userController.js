import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../models/userModel.js";
import handleError from "../utlis/handleError.js";

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
   const token = user.getJwtToken()
   res.status(201).json({
    success:true,
    user,
    token
   })

})

