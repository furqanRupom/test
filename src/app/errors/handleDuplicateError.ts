import mongoose from "mongoose";
import config from "../config";


export const handleDuplicateError = (error:mongoose.Error.OverwriteModelError) => {
   const match = error.message.match(/"([^"]*)"/);
   const extractedMessage = match && match[0];

   return {
     success: false,
     message: `Duplicate Error`,
     errorMessage: `${extractedMessage} is Already Exit !`,
     errorDetails: {
       match,
     },
     stack: config.node_env === 'development' ? error?.stack : null,
   };
}