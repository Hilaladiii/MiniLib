import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { WinstonlogService } from 'src/modules/winstonlog/winstonlog.service';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(private loggerService: WinstonlogService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, headers, query, body } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const responseTime = Date.now() - startTime;
      this.loggerService.logRequest({
        method,
        url,
        headers: {
          host: headers.host,
          userAgent: headers['user-agent'],
        },
        query,
        body,
        statusCode: res.statusCode,
        responseTime: `${responseTime}ms`,
      });
    });

    next();
  }
}
