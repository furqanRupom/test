

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
  const {meta,result} = await courseServices.retrieveAllCoursesFromDB(req.query);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Courses retrieved successfully !',
      meta:meta,
      data: result
    });
})



/* update course */






/* create course reviews */

const createCourseReviews = catchAsync(async(req,res)=>{
  const result = await courseServices.createCourseReviewsIntoDB(req.body);

 sendResponse(res, {
   success: true,
   statusCode: 201,
   message: 'Review created successfully',
   data: result,
 });
})



export const courseController = {
  createCourse,
  retrieveAllCourses,
  createCourseReviews
}