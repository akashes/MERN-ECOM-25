import express from 'express'
import product from './routes/productRoutes.js'
import errorHandleMiddleware from './middleware/error.js'
import user from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'

const app = express()


//middlewares
app.use(express.json())
app.use(cookieParser())


//routes

app.use('/api/v1',product)
app.use('/api/v1',user)


//error middleware
app.use(errorHandleMiddleware)


export default app