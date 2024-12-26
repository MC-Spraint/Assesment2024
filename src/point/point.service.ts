import { Injectable } from '@nestjs/common';
import { CreatePointDto } from './dtos/create-point.dto';
import { UpdatePointDto } from './dtos/update-point.dto';
import { PointsRepository } from './point.repo';
import { Point } from './entity/point.entity';

@Injectable()
export class PointsService {
  constructor(private readonly pointsRepository: PointsRepository) {}

  async createPoint(createPointDto: CreatePointDto): Promise<Point> {
    return this.pointsRepository.createPoint(createPointDto);
  }

  async getPoints(): Promise<Point[]> {
    return this.pointsRepository.getPoints();
  }

  async updatePoint(
    id: number,
    updatePointDto: UpdatePointDto,
  ): Promise<Point> {
    return this.pointsRepository.updatePoint(id, updatePointDto);
  }

  async deletePoint(id: number): Promise<Partial<Point>> {
    return this.pointsRepository.deletePoint(id);
  }
}
