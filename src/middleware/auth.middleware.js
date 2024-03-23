import AppError from "../utils/Error.js"
import jwt from 'jsonwebtoken'

const isloggedIn =async (req, res,next)=>{

    const { token } =req.cookies
    if(!token ) return next( new AppError('unAuthenticated, pleases login ',400))
    const userDetails = await jwt.verify(token, process.env.SECRET_KEY)
    req.user =userDetails
    next()

}

export { isloggedIn }