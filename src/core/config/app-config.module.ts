import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidations } from './config.validation';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionsFilter } from './exception_filter/globalException.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidations,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
  ],
  providers: [
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
  ],
  exports: [ConfigService],
})
export class AppConfigModule {}
