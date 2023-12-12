
class AppError extends Error {
  public errorMessage: string;
  public errorDetails: unknown;

  constructor(errorMessage: string, message: string, stack = '') {
    super(message);
    this.errorMessage = errorMessage
    this.errorDetails = this.errorDetails

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
