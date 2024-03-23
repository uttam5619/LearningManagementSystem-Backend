import {Schema, model} from 'mongoose'

const CourseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
        minLength: [3, 'title should contain atleast 3 characters'],
        maxLength: [50, 'title should contain atmax 50 characters'],
        trim: true,

    },
    description:{
        type: String,
        required: [true, 'description is required'],
        minLength: [10, 'description should contain atleast 10 characters'],
        maxLength: [200, 'title should contain atmax 200 characters'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'category is required'],
    },
    thumbnail:{
        public_id: {
            type:String,
            required: true
        },
        secure_url:{
            type: String,
            required: true
        }
        
    },
    lectures:[
        {
            title: String,
            decription: String,
            lecture: {
                public_id: {
                    type:String,
                    required: true
                },
                secure_url:{
                    type: String,
                    required: true
                }
                
            }
        }
    ],
    numberOfLectures:{
        type: Number,
        default: 0
    },
    createdBy:{
        type: String,
        required: [true,'name of creator is required']
    }
},{timestamps: true})


const Course = model('Course',CourseSchema)

export default Course