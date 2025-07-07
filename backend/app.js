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

import path from 'path'
import { fileURLToPath } from 'url'

if(process.env.NODE_ENV!=='PRODUCTION'){

  dotenv.config({path:'backend/config/config.env'})
}


const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
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


console.log("MONGO_URI =", process.env.MONGO_URI);


//routes
app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/api/v1',product)
app.use('/api/v1',user)
app.use('/api/v1',order)
app.use('/api/v1',payment) 




//serve static files
app.use(express.static(path.join(__dirname,'../frontend/dist')))
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});

//error middleware
app.use(errorHandleMiddleware)


export default app 