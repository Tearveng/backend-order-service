import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AxiosExceptionFilter  {
  // catch(exception: any, host: ArgumentsHost) {
  //   const ctx = host.switchToHttp();
  //   const response = ctx.getResponse<Response>();
  //   const status =
  //     exception.response?.status || HttpStatus.INTERNAL_SERVER_ERROR; // Default to 500 if no status code
  //
  //   // Get the error message, fallback to a general message if not available
  //   const messages =
  //     exception.response?.data?.message ||
  //     exception.message ||
  //     'An error occurred with the external service';
  //
  //   // You can access additional information about the error
  //   const errorData =
  //     exception.response?.statusText || 'No error details available';
  //   // Generate timestamp for when the error occurred
  //   const timestamp = new Date().toISOString(); // ISO 8601 format
  //
  //   // Format the error response
  //   response.status(status).json({
  //     statusCode: status,
  //     message: messages,
  //     error: errorData,
  //     timestamp,
  //   });
  // }
}
