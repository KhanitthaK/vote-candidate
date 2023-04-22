import {
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ExecutionContextHost) {
    const request = host.switchToHttp().getRequest();
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();

    if (request === host.switchToHttp().getRequest<Request>()) {
      response.status(status).json(exception.getResponse());
    }

    response.status(status);
  }
}
