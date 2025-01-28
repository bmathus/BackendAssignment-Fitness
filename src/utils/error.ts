class AppError extends Error {
  public errorType: string;

  constructor(message: string, errorType: string) {
    super(message);
    this.errorType = errorType;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
