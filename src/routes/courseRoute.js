import {Router } from 'express'
import upload from '../middleware/multer.middleware.js'
import { getCourseWithId, getAllCourses, createCourse, updateCourse, deleteCourse } from '../controller/course.Controller.js'
const courseRoute=Router()

courseRoute.post('/', createCourse).get('/', getAllCourses)

courseRoute.put('/:id', updateCourse)
.get('/:id', getCourseWithId)
.delete('/:id',deleteCourse)


export default courseRoute