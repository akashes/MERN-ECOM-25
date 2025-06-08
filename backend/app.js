import express from 'express'
import product from './routes/productRoutes.js'
import errorHandleMiddleware from './middleware/error.js'
import user from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import order from './routes/orderRoutes.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'

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

//error middleware
app.use(errorHandleMiddleware)


export default app