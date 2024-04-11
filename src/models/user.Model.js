import { Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'


const userSchema = new Schema({
    name: {
        type: String, 
        requires: [true, ' name is required'],
        trim: true,
        lowercase: true,
        minLength: [2, 'name should contain atleast 2 characters'],
        maxLength: [60, 'name should contain atmax 60 characters']
    },
    email: {
        type: String,
        unique: true,
        required: [true,' email is required'],
        trim: true,
        match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, 'provide a valid email']
    },
    password: {
        type: String,
        required: [true,' password is required'],
        minLength: [6, 'password should contain atleast 6 characters'],
        maxLength: [60, 'password should contain more than 60 characters'],
        trim: true,
        select:false
    },
    avatar: {
        public_id: {
            type: String,//cloudinary
        },
        secure_url:{
            type: String,//cloudinary
        }
    },
    role:{
        type: String,
        enum: ["USER", "ADMIN"],
        default: 'USER'
    },
    forgetPasswordToken: String,
    forgetPasswordExpiry: Date
}, {timestamps:true})


userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password =await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods ={
    generateToken: async function (){
        return await jwt.sign(
            {id: this.id, email: this.email, subscription: this.Subscription, role: this.role},
            process.env.SECRET_KEY,
            {
                expiresIn: process.env.EXPIRY
            }
        )
    },
    comparePassword: async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword, this.password)
    },
    generatepasswordResetToken: async function(){
        const resetToken =crypto.randomBytes(20).toString('hex')// generating Token

        this.forgetPasswordToken =crypto.createHash('sha256').update(resetToken).digest('hex'),
        /*this is the token which is going under considreation
        in the database, therefore we encrypted the resetToken */

        this.forgetPasswordExpiry= Date.now() + 15*60*1000  //15 minutes from now
        return resetToken // this token will be send to the user's email.
    }
}

const User= model('User', userSchema)

export default User