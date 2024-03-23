import mongoose from "mongoose"

mongoose.set('strictQuery', false);

const connectDB= ()=>{
    mongoose.connect(`mongodb://localhost:27017/test01`)
    .then((e)=>{
        console.log(`database connection established with ${e.connection.host}`)
    })
    .catch((err)=>{
        console.log(`failed to connect to database: ${err.message}`)
        process.exit(1)
    })
}

export default connectDB