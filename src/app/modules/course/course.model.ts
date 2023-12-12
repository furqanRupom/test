import { Schema, model } from 'mongoose';
import {  ICourse, IDetails, IReviews, ITags } from './course.interface';


/* tags schema */
const tagsSchema = new Schema<ITags>({
  name: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

/* details schema */

const detailsSchema = new Schema<IDetails>({
  level: {
    type: String,
    enum:{
      values:['Beginner','Intermediate','Advanced'],
      message:'{VALUE} is not valid !'
    }

  },
  description: {
    type: String,
    required: true,
  },
});


/* course schema */

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
    ref:'Category'
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
  durationInWeeks: {
    type: Number,

  },
  details: detailsSchema,
},
{
  timestamps:true
});

export const CourseModel = model<ICourse>('Course', courseSchema);



/* reviews schema */


const reviewsSchema = new Schema<IReviews>({
  courseId:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'Course'
  },
  rating:{
    type:Number,
    required:true
  },
  review:{
    type:String,
    required:true
  }
})


export const ReviewsModel = model<IReviews>('Reviews',reviewsSchema)