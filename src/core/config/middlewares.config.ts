import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, RawBodyRequest } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { VALIDATION_PIPE } from './config.pipe';

export class MiddleWaresConfig {
  constructor(
    private readonly app: NestExpressApplication,
    private readonly logger: Logger,
  ) {}

  configure(): void {
    this.app.use(
      bodyParser.json({
        verify: (req: RawBodyRequest<Request>, res: Response, buf: Buffer) => {
          req.rawBody = buf;
        },
      }),
    );

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.useGlobalPipes(VALIDATION_PIPE);
    this.app.setGlobalPrefix('api');
    this.app.enableCors();
    this.app.set('trust proxy', 1);
  }
}
