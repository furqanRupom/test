import express from "express"
import { courseController } from "./course.controller";
import validateRequest from "../../middleware/validateRequest";
import { courseValidations } from "./course.validation";

const router = express.Router();


/*  create courses routes */

router.post('/course',validateRequest(courseValidations.courseSchemaValidation),courseController.createCourse)

/* retrieve all courses routes  */

router.get('/courses',courseController.retrieveAllCourses)




router.get('/courses/:courseId/reviews',courseController.getSpecificCourseReviews);

router.get('/course/best',courseController.getBestCourse)

router.put('/courses/:courseId',validateRequest(courseValidations.courseSchemaUpdateValidation),courseController.updateCourse);

router.post('/reviews',validateRequest(courseValidations.reviewsSchemaValidation), courseController.createCourseReviews);




export const courseRoutes = router

