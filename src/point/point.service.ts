import { Injectable } from '@nestjs/common';
import { CreatePointDto } from './dtos/create-point.dto';
import { DeletePointDto } from './dtos/delete-point.dto';
import { UpdatePointDto } from './dtos/update-point.dto';
import { PointsRepository } from './point.repo';

@Injectable()
export class PointsService {
  constructor(private readonly pointsRepository: PointsRepository) {}

  async createPoint(createPointDto: CreatePointDto) {
    const { location, description } = createPointDto;
    return this.pointsRepository.createPoint(location, description);
  }

  async getPoints() {
    return this.pointsRepository.getPoints();
  }

  async updatePoint(id: number, updatePointDto: UpdatePointDto) {
    const { location, description } = updatePointDto;
    return this.pointsRepository.updatePoint(id, location, description);
  }

  async deletePoint(deletePointDto: DeletePointDto) {
    const { id } = deletePointDto;
    return this.pointsRepository.deletePoint(id);
  }
}
