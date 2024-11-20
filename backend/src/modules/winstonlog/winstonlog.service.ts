import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class WinstonlogService {
  private logger: winston.Logger;

  constructor() {
    const logDir = '/var/logs/secure-app';
    const parentDir = path.dirname(logDir);

    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true, mode: 0o700 });
    }
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { mode: 0o700 });
    }

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({
          filename: path.join(logDir, 'secure-log.log'),
        }),
      ],
    });
  }

  logRequest(requestData: Record<string, any>) {
    this.logger.info(requestData);
  }
}
