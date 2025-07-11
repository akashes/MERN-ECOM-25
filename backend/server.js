import app from './app.js'
import dotenv from 'dotenv'

if(process.env.NODE_ENV!=='PRODUCTION'){

    dotenv.config({path:'backend/config/config.env'}) //path based on the root directory which started the app
}

import {v2 as cloudinary} from 'cloudinary'
import { connectDB } from './config/db.js'
import Razorpay from 'razorpay' 
 
connectDB()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
//handle uncaught exceptions
process.on('uncaughtException',err=>{
    console.log(`Error:${err.message}`)
    console.log('Server is shutting down due to uncaught exception')
    process.exit(1)
})

  



const PORT = process.env.PORT || 3000

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,

});

const server =app.listen(PORT,()=>{

    console.log(`server is running on port ${PORT}`)
})   

process.on('unhandledRejection',err=>{
    console.log(`Error:${err.message}`)
    console.log('Server is shutting down due to unhandled promise rejection')
    server.close(()=>{
        process.exit(1)
    })  
})   