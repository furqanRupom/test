import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { handleZodError } from '../errors/handleZodError';
import { handleValidationError } from '../errors/handleValidationError';
import { handleCastError } from '../errors/handleCastError';
import { handleDuplicateError } from '../errors/handleDuplicateError';

/* create global error handler */

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let success: boolean = false;
  let message: string = error?.message || 'Something went wrong!';
  let errorMessage: string = error?.message || 'Something went wrong';
  let errorDetails = {};
  let stack: unknown = null;
  console.log(error)
  if (error instanceof ZodError) {
    const cleanError = handleZodError(error);
    message = cleanError.message;
    errorMessage = cleanError.errorMessage;
    errorDetails = cleanError.errorDetails;
    stack = cleanError?.stack;
  } else if (error?.name === 'ValidationError') {
    const cleanError = handleValidationError(error);
    message = cleanError.message;
    errorMessage = cleanError.errorMessage;
    errorDetails = cleanError.errorDetails;
    stack = cleanError?.stack;
  } else if (error?.name === 'CastError') {
    const cleanError = handleCastError(error);
    message = cleanError.message;
    errorMessage = cleanError.errorMessage;
    errorDetails = cleanError.errorDetails;
    stack = cleanError?.stack;
  } else if (error?.code === 11000) {
    const cleanError = handleDuplicateError(error);
    message = cleanError.message;
    errorMessage = cleanError.errorMessage;
    errorDetails = cleanError.errorDetails;
    stack = cleanError?.stack;
  }

  return res.status(400).json({
    success,
    message,
    errorMessage,
    errorDetails,
    stack,
  });
};
export default globalErrorHandler;
