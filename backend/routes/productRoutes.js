import express from 'express'
import {createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct} from '../controller/productController.js'
const router = express.Router()

router.route('/products')
.get(getAllProducts)
.post(createProduct)

router.route('/products/:id')
.get(getSingleProduct)
.put(updateProduct)
.delete(deleteProduct)

export default router