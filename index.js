import {config} from 'dotenv'
config()
import {app} from './app.js'
import connectDB from './src/config/configDatabase.js'
import cloudinary from 'cloudinary'


cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})


app.listen(process.env.PORT, async ()=>{
    await connectDB()
    console.log(`listing on port ${process.env.PORT}`)
})