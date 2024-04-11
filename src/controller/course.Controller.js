import Course from "../models/course.Model.js"
import AppError from "../utils/Error.js"


const createCourse =async (req, res, next) =>{

}


const updateCourse = async (req, res, next) =>{

}

const getCourseWithId =async (req, res, next)=>{
   try{
        
   }catch(err){

   }
}

const deleteCourse = async (req, res, next) =>{

}

const getAllCourses = async (req, res, next)=>{
    try{
        const allCourses =await Course.find({}).select('-lectures')
        if(!allCourses) return next( new AppError('Failed to fetch courses',400))
        return res.status(200).json({success:true, message: `successfully fetched all the courses`, data: allCourses})
    }catch(err){
        console.log(err)
    }
   
}

export {
    createCourse,
    updateCourse,
    getCourseWithId,
    deleteCourse,
    getAllCourses
}