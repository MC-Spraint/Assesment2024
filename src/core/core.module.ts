import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/app-config.module';
import { GlobalExceptionsFilter } from './config/exception_filter/globalException.filter';
import { APP_FILTER } from '@nestjs/core';
@Global()
@Module({
  imports: [AppConfigModule, DatabaseModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
  ],
  exports: [DatabaseModule],
})
export class CoreModule {}
