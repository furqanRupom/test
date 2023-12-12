import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { categoryServices } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await categoryServices.createCategoryIntoDB(payload);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Category created Successfully !',
    data: result,
  });
});

const retrieveAllCategories = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategoriesFromIntoDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: ' Categories retrieved successfully !',
    data: result,
  });
});


export const categoryController = {
  createCategory,
  retrieveAllCategories
}
