import express from 'express'
import {createProduct, getAllProducts} from '../controller/productController.js'
const router = express.Router()

router.route('/products')
.get(getAllProducts)
.post(createProduct)

export default router