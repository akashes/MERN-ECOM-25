import express from 'express'
import product from './routes/productRoutes.js'
import errorHandleMiddleware from './middleware/error.js'
import user from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import order from './routes/orderRoutes.js'
import payment from './routes/paymentRoutes.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
const app = express()


//middlewares
app.use(cors(
    {
        origin:'*'
    }
))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

//routes
app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/api/v1',product)
app.use('/api/v1',user)
app.use('/api/v1',order)
app.use('/api/v1',payment)

//error middleware
app.use(errorHandleMiddleware)
dotenv.config({path:'backend/config/config.env'})


export default app