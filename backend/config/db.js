import mongoose from "mongoose";

export const connectDB=async()=>{
    
         mongoose.connect(process.env.MONGO_URI).then((data)=>{
            console.log(`mongoDB connected ${data.connection.host}`)
         })
        
    
      
}