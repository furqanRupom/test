import mongoose, { startSession } from 'mongoose';
import { ICourse, IReviews } from './course.interface';
import { CourseModel, ReviewsModel } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

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
  console.log(query)

if (startDate && endDate && startDate <= endDate) {
  baseQuery.startDate = {
    $gte: startDate,
    $lte: endDate,
  };
} else if (startDate) {
  baseQuery.startDate = {
    $gte: startDate,
  };
} else if (endDate) {
  baseQuery.endDate = {
    $lte: endDate,
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
    query?.sortBy ||
    [
      'title',
      'price',
      'startDate',
      'endDate',
      'language',
      'durationInWeeks',
    ].includes(sortBy)
  ) {
    const value = sortBy.split(',').join(' ');
    sort = { [value]: sortOrder === 'asc' ? 1 : -1 };
  }

  /* pagination */

  let perPage = parseInt(page) || 1;
  let perPageLimit = parseInt(limit) || 10;
  let skip = (perPage - 1) * perPageLimit;

  const queryResult = CourseModel.find(baseQuery)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));

  const result = await queryResult;

  const meta = {
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 10,
    total: result.length,
  };

  return { result, meta };
};

/* update courses */

const updateCourseFromDB = async (
  courseId: string,
  payload: Partial<ICourse>,
) => {
  const {
    tags,
    details,
    startDate,
    endDate,
    durationInWeeks,
    ...remainingCourseInfo
  } = payload;

  const session = await startSession();

  try {
    session.startTransaction();

    /* update duration in weeks  */

    if (startDate || endDate) {
      let updateStartDate = new Date(
        (startDate as string) || (payload.startDate as string),
      );
      let updateEndDate = new Date(
        (endDate as string) || (payload.endDate as string),
      );
      if (!startDate || !endDate) {
        const previousStartDate = await CourseModel.findById(courseId, {
          startDate: 1,
        });
        const previousLastDate = await CourseModel.findById(courseId, {
          endDate: 1,
        });
        updateStartDate = new Date(previousStartDate?.startDate as string);
        updateEndDate = new Date(previousLastDate?.endDate as string);
        const diffTime: number =
          updateEndDate.getTime() - updateStartDate.getTime();
        payload.durationInWeeks = Math.ceil(
          diffTime / (1000 * 60 * 60 * 24 * 7),
        );
      }

      const diffTime: number =
        updateEndDate.getTime() - updateStartDate.getTime();
      payload.durationInWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    }

    // Step 1: Basic course info update
    const updatedBasicCourseInfo = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        ...remainingCourseInfo,
        startDate,
        endDate,
        durationInWeeks: payload.durationInWeeks,
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );




    if (!updatedBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    /* update details  */

     if (payload.details) {
       const updateDetails = await CourseModel.findByIdAndUpdate(
         courseId,
         {
           'details.level': payload.details.level,
           'details.description': payload.details.description,
         },
         {
           new: true,
           runValidators: true,
           session,
         },
       );

       if (!updateDetails) {
         throw new AppError(
           httpStatus.BAD_REQUEST,
           'Failed to update course details',
         );
       }
     }


    // Tags update
    if (tags && tags.length > 0) {
      // Filter out tags with isDeleted: true
      const newTags = tags
        .filter(el => el.name && !el.isDeleted)
        .map(el => ({
          name: el.name,
          isDeleted: false,
        }));

      const updatedCourse = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $set: { tags: newTags },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!updatedCourse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update course tags',
        );
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await CourseModel.findById(courseId, {
      _id: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

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
  getBestCoursesFromDB,
  updateCourseFromDB,
};
