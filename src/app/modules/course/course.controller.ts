

/* create course controller */

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";


const createCourse = catchAsync(async(req,res)=>{
  const payload = req.body;
  const  result = await courseServices.createCourseIntoDB(payload);
  sendResponse(res,{
    success:true,
    statusCode:201,
    message:'Course created Successfully !',
    data:result
  })
})


const createCategory = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await courseServices.createCategoryIntoDB(payload);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Category created Successfully !',
    data: result,
  });
});



export const courseController = {
  createCourse,
  createCategory
}