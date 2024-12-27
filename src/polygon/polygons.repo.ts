import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePolygonDto } from './dtos/create-polygon.dto';
import { UpdatePolygonDto } from './dtos/update-polygon.dto';
import { Polygon } from './entity/polygon.entity';
import { Database } from 'src/core/database/database.service';

@Injectable()
export class PolygonsRepository {
  constructor(private readonly databaseService: Database) {}

  async createPolygon(createPolygonDto: CreatePolygonDto): Promise<Polygon> {
    const { area, description } = createPolygonDto;
    const params = [area, description];
    const query = `
      INSERT INTO polygons (area, description)
      VALUES (ST_GeomFromGeoJSON($1), $2)
      RETURNING id, ST_AsGeoJSON(area)::jsonb AS area, description;
    `;
    const [polygon] = await this.databaseService.query<Polygon>(query, params);
    return polygon;
  }

  async getPolygons(): Promise<Polygon[]> {
    const query = `
      SELECT id, ST_AsGeoJSON(area)::jsonb AS area, description
      FROM polygons;
    `;
    const polygons = await this.databaseService.query<Polygon>(query);
    return polygons;
  }

  async updatePolygon(
    id: number,
    updatePolygonDto: UpdatePolygonDto,
  ): Promise<Polygon> {
    const { area, description } = updatePolygonDto;
    const params = [area, description, id];
    const query = `
      UPDATE polygons
      SET area = COALESCE(ST_GeomFromGeoJSON($1), area),
          description = COALESCE($2, description)
      WHERE id = $3
      RETURNING id, ST_AsGeoJSON(area)::jsonb AS area, description;
    `;
    const [polygon] = await this.databaseService.query<Polygon>(query, params);
    if (!polygon) throw new NotFoundException('Polygon Not Found!');
    return polygon;
  }

  async deletePolygon(id: number): Promise<Partial<Polygon>> {
    const params = [id];
    const query = `
    DELETE FROM polygons 
      WHERE id = $1 
    RETURNING id, ST_AsGeoJSON(area)::jsonb AS area, description;`;
    const [polygon] = await this.databaseService.query<Polygon>(query, params);
    if (!polygon) throw new NotFoundException('Polygon Not Found');
    return polygon;
  }
}
