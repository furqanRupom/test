import mongoose from 'mongoose';
import { ICourse, IReviews } from './course.interface';
import { CourseModel, ReviewsModel } from './course.model';

/* create course in to db  */

const createCourseIntoDB = async (payload: ICourse) => {
  /* calculate duration weeks */
  const startDate = new Date(payload.startDate);
  const endDate = new Date(payload.endDate);
  const defTime: number = endDate.getTime() - startDate.getTime();
  payload.durationInWeeks = Math.ceil(defTime / (1000 * 60 * 60 * 24 * 7));

  const result = await CourseModel.create(payload);
  result.save();

  return result;
};

/* retrieve all the courses */

const retrieveAllCoursesFromDB = async (query: any) => {
  const {
    page,
    limit,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    price,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = query;

  const baseQuery: any = {};

  /* price range filtering */

  if (minPrice !== undefined && maxPrice !== undefined) {
    baseQuery.price = {
      $gte: parseFloat(minPrice),
      $lte: parseFloat(maxPrice),
    };
  }

  /* tags name filtering */

  if (tags) {
    baseQuery.tags = {
      $elemMatch: {
        name: tags,
      },
    };
  }

  /* start Date and End Date filtering */

  if (startDate !== undefined && endDate !== undefined) {
    baseQuery.startDate = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  /* language filtering */

  if (language) {
    baseQuery.language = language;
  }

  /*  provider filtering */

  if (provider) {
    baseQuery.provider = provider;
  }

  /* duration in  weeks filtering */

  if (durationInWeeks !== undefined) {
    baseQuery.durationInWeeks = durationInWeeks;
  }

  /* price filtering */

  if (price) {
    baseQuery.price = price;
  }

  /* level filtering */

  if (level) {
    baseQuery['details.level'] = level;
  }

  /* sorting */
  let sort: any = null;

  if (
    sortBy &&
    ['title', 'price', 'startDate', 'endDate', 'language', 'duration'].includes(
      sortBy,
    )
  ) {
    sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
  }

  let perPage = parseInt(page) | 1;
  let perPageLimit = parseInt(limit) | 5;
  let skip = (perPage - 1) * perPageLimit;

  const result = await CourseModel.find(baseQuery)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const meta = {
    page: page | 1,
    limit: limit | 5,
    total: result.length,
  };

  return { result, meta };
};

/* update courses */

/* create reviews */

const createCourseReviewsIntoDB = async (payload: IReviews) => {
  const result = await ReviewsModel.create(payload);
  return result;
};

/* create course reviews by by course id from db */

const getSpecificCourseReviewsFromDB = async (courseId: string) => {
  const result = await CourseModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(courseId),
      },
    },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $project: { createdAt: 0, updatedAt: 0, __v: 0 },
    },
  ]);

  const [course] = result;
  return course;
};

/* get best courses */

const getBestCoursesFromDB = async () => {
  const result = await ReviewsModel.aggregate([
    {
      $group: {
        _id: '$courseId',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
    {
      $sort: {
        averageRating: -1,
        reviewCount: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $lookup: {
        from: 'courses',
        localField: '_id',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $unwind: '$course',
    },
    {
      $project: {
        _id: '$course._id',
        title: '$course.title',
        instructor: '$course.instructor',
        categoryId: '$course.categoryId',
        price: '$course.price',
        tags: '$course.tags',
        startDate: '$course.startDate',
        endDate: '$course.endDate',
        language: '$course.language',
        provider: '$course.provider',
        durationInWeeks: '$course.durationInWeeks',
        details: '$course.details',
        averageRating: 1,
        reviewCount: 1,
      },
    },
  ]);

  const [bestCourse] = result;
  return bestCourse;
};
export const courseServices = {
  createCourseIntoDB,
  retrieveAllCoursesFromDB,
  createCourseReviewsIntoDB,
  getSpecificCourseReviewsFromDB,
  getBestCoursesFromDB
};
