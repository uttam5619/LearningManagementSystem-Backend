import {Router } from 'express'
import upload from '../middleware/multer.middleware.js'
import { getCourseWithId, getAllCourses, createCourse, updateCourse, deleteCourse } from '../controller/course.Controller.js'
const courseRoute=Router()

courseRoute.post('/', createCourse)
courseRoute.put('/:id', updateCourse)
courseRoute.get('/', getAllCourses)
courseRoute.get('/:id', getCourseWithId)
courseRoute.delete('/:id',deleteCourse)


export default courseRoute