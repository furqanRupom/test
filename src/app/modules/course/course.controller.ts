

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


const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const payload = req.body;
  const result = await courseServices.updateCourseFromDB(courseId, payload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Courses updated successfully !',
    data: result,
  });
});





/* create course reviews */

const createCourseReviews = catchAsync(async(req,res,next)=>{
  console.log(req.body)
  const result = await courseServices.createCourseReviewsIntoDB(req.body);

 sendResponse(res, {
   success: true,
   statusCode: 201,
   message: 'Review created successfully',
   data: result,
 });
})



/* create course reviews by by course id from db */

const getSpecificCourseReviews = catchAsync(async (req, res) => {
  const result = await courseServices.getSpecificCourseReviewsFromDB(req.params.courseId);


  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Retrieve course with reviews successfully',
    data: result,
  });
});


/* get best course */

const getBestCourse = catchAsync(async(req,res)=>{
  const result = await courseServices.getBestCoursesFromDB();
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Best course retrieved successfully',
      data: result,
    });
})

export const courseController = {
  createCourse,
  retrieveAllCourses,
  createCourseReviews,
  getSpecificCourseReviews,
  getBestCourse,
  updateCourse
}