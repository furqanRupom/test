import express from "express"
import { courseRoutes } from "../modules/course/course.routes";
import { categoryRoutes } from "../modules/category/category.routes";




const router = express.Router();


const moduleRoutes = [
  {
    path:"/",
    route:courseRoutes
  },
  {
    path:"/categories",
    route:categoryRoutes
  }
];


moduleRoutes.forEach(({path,route})=> router.use(path,route))

export default router;


