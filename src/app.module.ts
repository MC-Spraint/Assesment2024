import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { PolygonsModule } from './polygon/polygons.module';
import { PointsModule } from './point/point.module';

@Module({
  imports: [CoreModule, PolygonsModule, PointsModule],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
