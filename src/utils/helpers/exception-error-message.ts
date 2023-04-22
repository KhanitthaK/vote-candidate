type ErrorWithMessage = {
  message: string;
};

export class ExceptionErrorMessage {
  private static isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as Record<string, unknown>).message === 'string'
    );
  }

  private static toErrorWithMessage(error: unknown): ErrorWithMessage {
    if (ExceptionErrorMessage.isErrorWithMessage(error)) return error;

    try {
      return new Error(JSON.stringify(error));
    } catch {
      return new Error(String(error));
    }
  }

  public static getErrorMessage(error: unknown): string {
    return ExceptionErrorMessage.toErrorWithMessage(error).message;
  }
}
