import express, { Application ,Request,Response } from "express";
import cors from "cors"
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app:Application = express()

app.use(cors());
app.use(express.json());



/* all routes */

app.use('/api/')

app.get('/',(req:Request,res:Response)=>{
 res.send('yes course garden is running')
})


/* global error handler middleware */

app.use(globalErrorHandler)

export default app;