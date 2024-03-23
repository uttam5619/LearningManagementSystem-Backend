import express from 'express';
const userRoutes =express.Router()
import { SignIn, SignUp, Logout, getProfile, forgotPassword, resetPassword } from '../controller/user.Controller.js'
import { isloggedIn } from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';



userRoutes.post('/signIn', SignIn)
userRoutes.post('/signUp',upload.single('avatar'),SignUp)
userRoutes.post('/logout',Logout)
userRoutes. get('/me',isloggedIn, getProfile)
userRoutes.post('/forgotpassword', forgotPassword)
userRoutes.post('/reset-password', resetPassword)


export default userRoutes

