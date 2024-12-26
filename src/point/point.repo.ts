import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePointDto } from './dtos/create-point.dto';
import { UpdatePointDto } from './dtos/update-point.dto';
import { Point } from './entity/point.entity';
import { Database } from 'src/core/database/database.service';

@Injectable()
export class PointsRepository {
  private readonly logger = new Logger(PointsRepository.name);

  constructor(private readonly databaseService: Database) {}

  async createPoint(createPointDto: CreatePointDto): Promise<Point> {
    const { location, description } = createPointDto;
    const query = `
      INSERT INTO points (location, description)
      VALUES (ST_GeomFromGeoJSON($1), $2)
      RETURNING id, ST_AsGeoJSON(location) AS location, description;
    `;
    const [point] = await this.databaseService.query<Point>(query, [
      location,
      description,
    ]);
    return point;
  }

  async getPoints(): Promise<Point[]> {
    const query = `
      SELECT id, ST_AsGeoJSON(location) AS location, description
      FROM points;
    `;
    const points = await this.databaseService.query<Point>(query);
    return points;
  }

  async updatePoint(
    id: number,
    updatePointDto: UpdatePointDto,
  ): Promise<Point> {
    const { location, description } = updatePointDto;
    const query = `
      UPDATE points
      SET location = COALESCE(ST_GeomFromGeoJSON($1), location),
          description = COALESCE($2, description)
      WHERE id = $3
      RETURNING id, ST_AsGeoJSON(location) AS location, description;
    `;
    const [updatePoint] = await this.databaseService.query<Point>(query, [
      location,
      description,
      id,
    ]);
    if (!updatePoint) throw new NotFoundException('Point Not Found!');
    return updatePoint;
  }

  async deletePoint(id: number): Promise<Partial<Point>> {
    const params = [id];
    const query = `DELETE FROM points WHERE id = $1 RETURNING *;`;
    const [data] = await this.databaseService.query<Point>(query, params);
    if (!data) throw new NotFoundException('Point Not Found');
    return data;
  }
}
