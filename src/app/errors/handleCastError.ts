import mongoose from 'mongoose';
import config from '../config';

export const handleCastError = (error: mongoose.Error.CastError) => {
  const errorMessage = error.message.concat();
  const errorDetails = {
    stringValue:error.stringValue,
    valueType:error.stringValue,
    kind:error.kind,
    path:error.path,
    reason:error.reason,
    name:error.name,
    message:error.message
  }

  return {
    success: false,
    message: 'Cast Error',
    errorMessage,
    errorDetails,
    stack: config.node_env === 'development' ? error?.stack : null,
  };
};
