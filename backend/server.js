import app from './app.js'
import dotenv from 'dotenv'

dotenv.config({path:'backend/config/config.env'}) //path based on the root directory which started the app

import product from './routes/productRoutes.js'
import { connectDB } from './config/db.js'

connectDB()





const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})  