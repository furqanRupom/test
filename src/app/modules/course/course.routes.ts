import express from "express"
import { courseController } from "./course.controller";
import validateRequest from "../../middleware/validateRequest";
import { courseValidations } from "./course.validation";

const router = express.Router();


/*  create courses routes */
router.post('/course',/*validateRequest(courseValidations.courseSchemaValidation),*/courseController.createCourse)
router.get('/courses',courseController.retrieveAllCourses)




export const courseRoutes = router

