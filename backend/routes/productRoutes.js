import express from 'express'
import {createProduct, deleteProduct, getAdminProducts, getAllProducts, getSingleProduct, searchProduct, updateProduct} from '../controller/productController.js'
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js'
const router = express.Router()

router.route('/products')
.get(getAllProducts)

router.route('/products/:id')
.get( getSingleProduct)

router.route('/admin/products')
.get(verifyUserAuth,roleBasedAccess('admin'),getAdminProducts)


router.route('/admin/products') // create product router.route('/admin/product/create')
.post( verifyUserAuth,roleBasedAccess('admin'), createProduct)

router.route('/admin/products/:id')
.put(verifyUserAuth,roleBasedAccess('admin'), updateProduct)
.delete(verifyUserAuth,roleBasedAccess('admin'), deleteProduct)



export default router