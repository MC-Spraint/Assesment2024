import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from './core/config/config.validation';
import { Logger } from '@nestjs/common';
import { MiddleWaresConfig } from './core/config/middlewares.config';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './core/config/swagger/swagger';

async function ApplicationBootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  const logger = app.get(Logger);
  const configService = app.get(ConfigService);
  const port = configService.get(EnvVariables.PORT);
  const middleWares = new MiddleWaresConfig(app, logger);
  middleWares.configure();
  SwaggerModule.setup('api', app, createDocument(app));
  await app.listen(port);
  logger.log(
    `server is up & running on port ${port}`,
    ApplicationBootstrap.name,
  );
}
ApplicationBootstrap();
