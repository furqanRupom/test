import mongoose from 'mongoose';
import config from '../config';

export const handleCastError = (error: mongoose.Error.CastError) => {
  const errorMessage = `${error.value} is not a valid ${error.kind}!`;

  const errorDetails = {
    stringValue: error.stringValue,
    valueType: error.value,
    kind: error.kind,
    path: error.path,
    reason: error.reason,
    name: error.name,
    message: error.message,
  };

  return {
    success: false,
    message: `Invalid ${error.kind}`,
    errorMessage,
    errorDetails,
    stack: config.node_env === 'production' ? error?.stack : null,
  };
};
