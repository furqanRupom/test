/* create category in to db */

import { ICategory } from "./category.interface";
import { CategoryModel } from "./category.model";


/* crete categories */
const createCategoryIntoDB = async (payload: ICategory) => {

  const result = await CategoryModel.create(payload);
  return result;
};


/* retrieve all categories */

const getAllCategoriesFromIntoDB = async () => {
  const result = await CategoryModel.find();
  return result;
}


export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromIntoDB
}