import express from 'express'
import {createProduct, deleteProduct, getAllProducts, getSingleProduct, searchProduct, updateProduct} from '../controller/productController.js'
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js'
const router = express.Router()

router.route('/products')
.get(verifyUserAuth,getAllProducts)
.post( verifyUserAuth,roleBasedAccess('admin'), createProduct)

router.route('/products/:id')
.get(verifyUserAuth, getSingleProduct)
.put(verifyUserAuth,roleBasedAccess('admin'), updateProduct)
.delete(verifyUserAuth,roleBasedAccess('admin'), deleteProduct)


export default router