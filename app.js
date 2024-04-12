import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import userRoutes from './src/routes/userRoute.js';
import errorMiddleware from './src/middleware/error.middleware.js';
import courseRoute from './src/routes/courseRoute.js';
import bodyParser from 'body-parser';
const app = express();


app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials:true

}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/api/v1/user',userRoutes)
app.use('/api/v1/course',courseRoute)


app.use(errorMiddleware)


app.get('/', function(req, res){
    res.send('you are up on the server')
})


app.get('*',(req, res)=>{
    res.send('OOPS! page not found')
})

export {app}