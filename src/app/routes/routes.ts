import express from "express"
import { courseRoutes } from "../modules/course/course.routes";




const router = express.Router();


const moduleRoutes = [
  {
    path:"/",
    route:courseRoutes
  }
];


moduleRoutes.forEach(({path,route})=> router.use(path,route))


