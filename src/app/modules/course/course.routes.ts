import express from "express"
import { courseController } from "./course.controller";
import validateRequest from "../../middleware/validateRequest";
import { courseValidations } from "./course.validation";

const router = express.Router();


/*  create courses routes */
router.post('/',validateRequest(courseValidations.courseSchemaValidation),courseController.createCourse)




export const courseRoutes = router

