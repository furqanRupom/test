import express, { Application ,Request,Response } from "express";
import cors from "cors"
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import router from "./app/routes/routes";

const app:Application = express()

app.use(cors());
app.use(express.json());



/* all routes */

app.use('/api',router)
/* global error handler middleware */

app.use(globalErrorHandler);

app.get('/',(req:Request,res:Response)=>{
 res.send('yes course garden is running')
})





export default app;