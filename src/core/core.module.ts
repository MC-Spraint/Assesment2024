import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/app-config.module';
import { UtilModule } from './utils/util.module';
@Global()
@Module({
  imports: [AppConfigModule, DatabaseModule, UtilModule],
  providers: [],
  exports: [DatabaseModule, UtilModule],
})
export class CoreModule {}
