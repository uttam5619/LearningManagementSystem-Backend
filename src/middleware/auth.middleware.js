import AppError from "../utils/Error.js"
import jwt from 'jsonwebtoken'

const isloggedIn =async (req, res,next)=>{

    const { token } =req.cookies
    if(!token ) return res.status(403).json({success:false, message:'please login'})
    const userDetails = await jwt.verify(token, process.env.SECRET_KEY)
    req.user =userDetails
    next()

}


const authorizedRoles =(...roles)=> async (req, res, next)=>{
    const currentUserRole =req.user.role
    if(!roles.includes(currentUserRole)){
        return res.status(403).json({success:false, message:'permission denied'})
    }
    next()
}

export { isloggedIn, authorizedRoles }