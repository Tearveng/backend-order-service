import { Injectable, NestMiddleware } from '@nestjs/common';
import { RequestContextService } from './RequestContextService';
import { NextFunction } from 'express';

@Injectable()
export class HeadersMiddleware implements NestMiddleware {
  constructor(private readonly requestContextService: RequestContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.requestContextService.setHeaders(req.headers);
    next();
  }
}
