import { ICategory } from "./category.interface";
import { Schema, model } from "mongoose";

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
});

export const CategoryModel = model<ICategory>('Category', categorySchema);
