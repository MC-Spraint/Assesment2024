import { Module } from '@nestjs/common';
import { PointsRepository } from './point.repo';
import { PointsService } from './point.service';
import { PointsController } from './point.controller';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PointsController],
  providers: [PointsService, PointsRepository],
})
export class PointsModule {}
