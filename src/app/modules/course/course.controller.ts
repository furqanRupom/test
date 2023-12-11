

/* create course controller */

import catchAsync from "../../utils/catchAsync";
import { courseServices } from "./course.service";


const createCourse = catchAsync(async(req,res)=>{
  const payload = req.body;
  const  result = await courseServices.createCourseIntoDB(payload);
  
})