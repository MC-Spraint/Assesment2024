import { Injectable } from '@nestjs/common';
import { CreatePolygonDto } from './dtos/create-polygon.dto';
import { UpdatePolygonDto } from './dtos/update-polygon.dto';
import { PolygonsRepository } from './polygons.repo';
import { Polygon } from './entity/polygon.entity';

@Injectable()
export class PolygonsService {
  constructor(private readonly polygonsRepository: PolygonsRepository) {}

  async createPolygon(createPolygonDto: CreatePolygonDto): Promise<Polygon> {
    return this.polygonsRepository.createPolygon(createPolygonDto);
  }

  async getPolygons(): Promise<Polygon[]> {
    return this.polygonsRepository.getPolygons();
  }

  async updatePolygon(
    id: number,
    updatePolygonDto: UpdatePolygonDto,
  ): Promise<Polygon> {
    return this.polygonsRepository.updatePolygon(id, updatePolygonDto);
  }

  async deletePolygon(id: number): Promise<Partial<Polygon>> {
    return this.polygonsRepository.deletePolygon(id);
  }
}
