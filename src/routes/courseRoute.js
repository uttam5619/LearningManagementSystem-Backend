import {Router } from 'express'
import { getCourseWithId, getAllCourses, createCourse, updateCourse, deleteCourse } from '../controller/course.Controller.js'
const courseRoute=Router()

courseRoute.post('/create', createCourse)
courseRoute.put('/update/:id', updateCourse)
courseRoute.get('/', getAllCourses)
courseRoute.get('/:id', getCourseWithId)
courseRoute.delete('/delete/:id',deleteCourse)


export default courseRoute