import express from 'express'
import product from './routes/productRoutes.js'

const app = express()


//middlewares
app.use(express.json())
 
//routes
app.use('/api/v1',product)



export default app