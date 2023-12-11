import { ICategory, ICourse } from "./course.interface";
import { CategoryModel, CourseModel } from "./course.model";


/* create course in to db  */


/* TODO : sorting,filtering and paginating */

const createCourseIntoDB = async (payload:ICourse) => {
  const result = await CourseModel.create(payload);
  return result;
}






/* create category in to db */


const createCategoryIntoDB = async (payload:ICategory) => {
  const result = await CategoryModel.create(payload);
  return result;
}




export const courseServices = {
  createCategoryIntoDB,
  createCourseIntoDB
}