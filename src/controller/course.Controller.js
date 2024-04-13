import Course from '../models/course.Model.js'
import AppError from "../utils/Error.js"
import { courseImage } from "../utils/constant.js"
import fs from 'fs/promises'
import cloudinary from 'cloudinary'


const createCourse =async (req, res) =>{
    
        const {title, description, category, createdBy} = req.body
        if(!title || !description || !category || !createdBy){
            return res.status(400).json({success: false, message:'provide mandatory details'})
        }

        try{
            const course = await Course.create(
                {
                    title,
                    description,
                    createdBy,
                    category,
                    thumbnail:{
                        public_id: Math.floor(Math.random()*1000),
                        secure_url: courseImage
                    }
                }
            )
            if(!course){
                throw new AppError('failed to create course',500)
            }
            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.path,{
                    folder: 'LearningManagementSystem',
                    width:250,
                    height: 250,
                    gravity: 'faces',
                    crop: 'fill'
                })
                course.thumbnail.public_id =result.public_id,
                course.thumbnail.secure_url = result.secure_url
                fs.rm(`uploads/${req.file.filename}`)
            }
            await course.save()
            res.status(200).json({success: true, message:'created successfully', data: course})
        }catch(err){
            console.log(err.message,err)
        }
   
}


const updateCourse = async(req, res, next) =>{
    const { id }= req.params
    if(!id) return res.status(400).json({success: false, message:'provide a unique id'})
    try{
        const course = await Course.findByIdAndUpdate(
            id,
            {
                $set:req.body
            },
            {
                runValidators: true
            }
        )
        if(!course) return res.status(404).json({success:false,message:'course not found'})
        console.log('successfully updated course')
        return res.status(200).json({success: true, message:'updated successfully', data:course})
    }catch(err){
        console.log(err.message)
    }
}

const getCourseWithId =async (req, res, next)=>{
   try{
        const {id} =req.params
        const course = await Course.findById(id).select('-lectures')
        if(!course){
            return res.status(400).json({success: false, message:'Course not found'})
        }
        return res.status(200).json({success:true, message:`successfully fetched the course`, data:course})
   }catch(err){
        console.log(err.message)
   }
}

const deleteCourse = async (req, res, next) =>{
    const {id} = req.params
    if(!id) return res.status(400).json({success: false, message:'provide valid id regarding the course'})
    try{
        const course = await Course.findById(id)
        if(!course) return res.status(400).json({success: false, message:'Course not found'})
        await Course.findByIdAndDelete(id)
    return res.status(200).json({success:true, message:`course deleted successfully`})
    }catch(err){
        console.log(err.message, err)
    }
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