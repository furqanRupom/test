

/* create course controller */

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";

/* create courses */

const createCourse = catchAsync(async(req,res,next)=>{
  const payload = req.body;
  const  result = await courseServices.createCourseIntoDB(payload);
  sendResponse(res,{
    success:true,
    statusCode:201,
    message:'Course created Successfully !',
    data:result
  })
})

/* retrieve all courses */



const retrieveAllCourses  = catchAsync(async(req,res,next) => {
  const result = await courseServices.retrieveAllCoursesFromDB(req.query);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Courses retrieved successfully !',
      data: result,
    });
})





export const courseController = {
  createCourse,
  retrieveAllCourses
}