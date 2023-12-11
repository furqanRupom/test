export interface IError {
  success: boolean;
  message: string;
  errorMessage: string;
  errorDetails: object;
  stack?: unknown;
}
