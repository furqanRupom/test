import mongoose from 'mongoose';
import { IError } from '../interface/error';
import config from '../config';



export const handleValidationError = (
  error: mongoose.Error.ValidationError,
): IError => {
  const errorDetails = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        value:val?.value,
        kind:val?.kind,
        reason:val?.reason,
        message: val?.message,
        path: val?.path,
      };
    },

  );


  const errorMessage = errorDetails.map(msg=> msg.message)


  return {
    success: false,
    message: 'Validation Error',
    errorMessage:errorMessage.join(' '),
    errorDetails,
    stack: config.node_env === 'development' ? error?.stack : null,
  };
};
