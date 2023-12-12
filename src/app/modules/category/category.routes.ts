import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { categoryValidations } from './category.validation';
import { categoryController } from './category.controller';


const router = express.Router();

/*  create courses routes */
router.post(
  '/',
  validateRequest(categoryValidations.categorySchemaValidation),
  categoryController.createCategory,
);
router.get('/',categoryController.retrieveAllCategories);
export const categoryRoutes = router;
