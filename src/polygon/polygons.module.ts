import { Module } from '@nestjs/common';
import { PolygonsController } from './polygons.controller';
import { PolygonsService } from './polygons.service';
import { PolygonsRepository } from './polygons.repo';
import { DatabaseModule } from 'src/core/database/database.module';
import { UtilService } from 'src/core/utils/util.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PolygonsController],
  providers: [PolygonsService, PolygonsRepository, UtilService],
})
export class PolygonsModule {}
