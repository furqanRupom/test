import { Schema, model } from 'mongoose';
import { ICategory, ICourse, IDetails, ITags } from './course.interface';

const tagsSchema = new Schema<ITags>({
  name: {
    typ: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const detailsSchema = new Schema<IDetails>({
  level: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const courseSchema = new Schema<ICourse>({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: [tagsSchema],
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  durationWeeks: {
    type: Number,
    required: true,
  },
  details: detailsSchema,
});


export const CourseModel = model<ICourse>('Course',courseSchema);



/* category model and schema */


const categorySchema = new Schema<ICategory>({
 name:{
  type:String,
  required:true
 }
})


export const CategoryModel = model<ICategory>('Category',categorySchema)