import { Module } from '@nestjs/common';
import { PointsRepository } from './point.repo';
import { PointsService } from './point.service';

@Module({
  providers: [PointsService, PointsRepository],
  exports: [PointsService],
})
export class PointsModule {}
