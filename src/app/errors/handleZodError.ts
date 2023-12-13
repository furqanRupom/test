import { ZodError } from 'zod';
import config from '../config';

/* handle zod error */

/*

success:boolean;
message:string;
errorMessage:string;
errorDetails:any;
stack?:unknown

*/

export const handleZodError = (error: ZodError) => {
  const convertMessage = JSON.parse(error.message);
  const extractMessage: [] = convertMessage.map((msg: any) => {
   const message =  msg.path.map((path: any) => {
      return `${path} is ${msg.message}`
    });
    return message;
  });


  return {
    success: false,
    message: 'Zod Error',
    errorMessage: extractMessage.join('.'),
    errorDetails: {
      issues: error.issues,
    },
    stack: config.node_env === 'production' ? error?.stack : null,
  };
};
