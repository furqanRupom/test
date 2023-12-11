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
  const errorMessage = error.message.concat();

  return {
    success: false,
    message: 'zod Error',
    errorMessage,
    errorDetails: {
      issues: error.issues,
    },
    stack: config.node_env === 'development' ? error?.stack : null,
  };
};
