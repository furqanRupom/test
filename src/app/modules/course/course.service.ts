import { ICourse } from './course.interface';
import { CourseModel } from './course.model';

/* create course in to db  */

/* TODO : sorting,filtering and paginating */

const createCourseIntoDB = async (payload: ICourse) => {
  /* calculate duration weeks */
  const startDate = new Date(payload.startDate);
  const endDate = new Date(payload.endDate);
  const defTime: number = endDate.getTime() - startDate.getTime();
  payload.durationWeeks = Math.ceil(defTime / (1000 * 60 * 60 * 24 * 7));

  const result = await CourseModel.create(payload);
  result.save();

  return result;
};

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

  let perPage = parseInt(page);
  let perPageLimit = parseInt(limit);
  let skip = (perPage - 1) * perPageLimit;

  const result = await CourseModel.find(baseQuery)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  return result;
};

export const courseServices = {
  createCourseIntoDB,
  retrieveAllCoursesFromDB,
};
