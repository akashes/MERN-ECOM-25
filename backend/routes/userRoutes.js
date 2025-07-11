import express from 'express'
import { deleteUser, getSingleUser, getUserDetails, getUserList, loginUser, logout, registerUser, requestPasswordReset, resetPassword, updatePassword, updateUserProfile, updateUserRole  } from '../controller/userController.js'
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logout) 
router.route('/password/forgot').post(requestPasswordReset)
router.route('/reset/:token').post(resetPassword)
router.route('/profile').get(verifyUserAuth,getUserDetails)
router.route('/password/update').put(verifyUserAuth,updatePassword)
router.route('/profile/update').put(verifyUserAuth,updateUserProfile)

router.route('/admin/users').get(verifyUserAuth,roleBasedAccess('admin'),getUserList)
router.route('/admin/users/:id')
.get(verifyUserAuth,roleBasedAccess('admin'),getSingleUser)
.put(verifyUserAuth,roleBasedAccess('admin'),updateUserRole)
.delete(verifyUserAuth,roleBasedAccess('admin'),deleteUser)


export default router