import express from 'express'
import product from './routes/productRoutes.js'
import errorHandleMiddleware from './middleware/error.js'
import user from './routes/userRoutes.js'
const app = express()


//middlewares
app.use(express.json())

//routes

app.use('/api/v1',product)
app.use('/api/v1',user)


//error middleware
app.use(errorHandleMiddleware)


export default app