import express from 'express'
import {createProduct, createProductReview, deleteProduct, deleteReview, getAdminProducts, getAllProducts, getProductReviews, getSingleProduct, updateProduct} from '../controller/productController.js'
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

router.route('/reviews').put(verifyUserAuth,createProductReview)
router.route('/admin/reviews')
.get(verifyUserAuth,roleBasedAccess('admin'),getProductReviews)
.delete( verifyUserAuth,roleBasedAccess('admin'), verifyUserAuth,deleteReview) 
//accepts product id as query
//accepts product id as query
export default router