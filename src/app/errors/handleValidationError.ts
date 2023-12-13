import mongoose from 'mongoose';
import { IError } from '../interface/error';
import config from '../config';

export const handleValidationError = (
  error: mongoose.Error.ValidationError,
): IError => {
  const errorDetails = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError ) => {
      return {
        value: val?.value,
        kind: val?.kind,
        reason: val?.reason,
        path: val?.path,
        name:val.name,
        message: val?.message,
      };
    },
  );

  const errorMessage = mongoose.Error.CastError ?  `${errorDetails[0].value} is not a valid ${errorDetails[0].kind}!` : errorDetails.map(msg => msg.message).join(' ');

  return {
    success: false,
    message:mongoose.Error.CastError ? `Invalid ${errorDetails[0].kind}` :'Validation Error',
    errorMessage,
    errorDetails,
    stack: config.node_env === 'development' ? error?.stack : null,
  };
};
