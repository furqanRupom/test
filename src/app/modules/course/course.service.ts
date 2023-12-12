import { ICourse } from './course.interface';
import { CourseModel } from './course.model';

/* create course in to db  */

/* TODO : sorting,filtering and paginating */

const createCourseIntoDB = async (payload: ICourse) => {
try {
  /* calculate duration weeks */
  const startDate = new Date(payload.startDate);
  const endDate = new Date(payload.endDate);
  const defTime: number = endDate.getTime() - startDate.getTime();

  payload.durationWeeks = Math.ceil(defTime / (1000 * 60 * 60 * 24 * 7));

  const result = await CourseModel.create(payload);
  result.save();

  return result;
} catch (error:any) {
  throw new Error(error?.message)
}

};

export const courseServices = {
  createCourseIntoDB,
};
