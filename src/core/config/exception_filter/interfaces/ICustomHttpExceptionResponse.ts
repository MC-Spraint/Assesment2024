import { HttpExceptionResponse } from './IHttpExceptionResponse';

export interface CustomHttpExceptionResponse<T> extends HttpExceptionResponse {
  success: boolean;
  response_code: number;
  response: string;
  message: string;
  data: T | null;
  path: string;
  method: string;
  timestamp: Date;
}
