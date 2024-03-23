import {Router } from 'express'
import { getCourseWithId, getAllCourses } from '../controller/course.Controller.js'
const courseRoute=Router()

courseRoute.get('/', getAllCourses)
courseRoute.get('/:id', getCourseWithId)


export default courseRoute