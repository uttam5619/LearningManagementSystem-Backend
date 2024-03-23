import User from "../models/user.Model.js"
import AppError from "../utils/Error.js"
import { profileImage } from "../utils/constant.js"
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const cookieOption ={
    maxAge: 7*24*60*60*1000,
    httpOnly: true,
    secure: true
}


const SignUp =async (req, res, next)=>{

    const { name, email, password } =req.body
    if(!name || !email || !password) return next(new AppError('All fields are required', 400))

    try{
        const isUserExist = await User.findOne({email})
        if(isUserExist) return next(new AppError('user already exists', 400))
    
        const user= await User.create(
            {
                name,
                email,
                password, 
                avatar:{public_id: email, secure_url:profileImage }
            }
        )
    
        if(!user) return next(new AppError('registrstion failed', 400))
    
        // TODO: file upload
        console.log(req.file)
        if(req.file){
            console.log('file details',JSON.stringify(req.file))
            try{
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'LearningManagementSystem',
                    width:250,
                    height: 250,
                    gravity: 'faces',
                    crop: 'fill'
                })
                if(result){
                    console.log(result)
                    console.log(result.secure_url)
                    user.avatar.public_id = result.public_id
                    user.avatar.secure_url = result.secure_url
                    //remove file from server
                    fs.rm (`uploads/${req.file.filename}`)
                }
            }catch(err){
                return res.status(400).json({success:false, message:err.message})
            }
        }

        user.save()
        // user.password =undefined
        const token= await user.generateToken()
        res.cookie('token', token , cookieOption)
        return res.status(201).json({success:true, message:'user sucessfully registered', data: user})

    }catch(err){
        console.log(err)
        return res.status(400).json({success:false, message:`failed to signUp`, data:err})
    }
   
}



const SignIn =async(req, res, next)=>{

    const { email, password} =req.body
    if(!email || !password) return next(new AppError('all fields are required', 400))

    try{
        const user =await User.findOne({email}).select('+password')
        if(!user || !user.comparePassword(password)) return next(new AppError('user not found', 400))
    
        const token = await user.generateToken()
        user.password=undefined
        res.cookie('token', token , cookieOption)
        return res.status(201).json({success:true, message:`sucessfully loggedIn`, data: user})
    }catch(err){
        console.log(err)
        return res.status(400).json({success:false, message:`failed to login`, data: err})
    }

}



const Logout =(req, res, next)=>{
    res.cookie('token', null, {
        secure: true, 
        maxAge: 0,
        httpOnly: true
    })
    return res.status(200).json({success:true, message: `user Logged out sucessfully`})
}



const getProfile =async (req, res, next)=>{
    
    try{
        const userId =req.user.id
        const user = await User.findById(userId)
        res.status(200).json({success:true, data: user})
    }catch(err){
        return next(new AppError('Failed to fetch profile'))
    }
}


const forgotPassword = async (req, res, next)=>{
    const { email} = req.body
    if(!email) next(new AppError('Email is required', 400))

    const user= await User.findOne({email})
    if(!user) return next(new AppError(`User not registered`),400)
    const resetToken = await user.genenratePasswordResetToken()
    await user.save()
    /*
    const resetPasswordURL=`${process.env.FRONTEND_URL}/reset-password/${resetToken}`

    try{
        await sendEmail(email, subject, message)
        res.status(200).json({success:true, message:`reset password token has been sent to ${email} successfully`})
    }catch(err){
        user.forgetPasswordExpiry=undefined
        user.forgetPasswordToken=undefined
        await user.save()
        return next(new AppError(err.message,500))
    }
    */
}

const resetPassword = (req, res, next)=>{
    //consol.log(req.body)
}


export {
    SignUp,
    SignIn, 
    Logout, 
    getProfile, 
    forgotPassword, 
    resetPassword
}