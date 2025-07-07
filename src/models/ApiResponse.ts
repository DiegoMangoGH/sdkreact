export interface ApiResponse<T> {
    isSuccess: boolean;
    isWarning: boolean;
    errorCode: number;
    message: string;
    data: T;
  }