import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class PointsRepository {
  constructor(@Inject('DATABASE_POOL') private readonly pool: Pool) {}

  async createPoint(location: string, description: string) {
    const query = `
      INSERT INTO points (location, description)
      VALUES (ST_GeomFromGeoJSON($1), $2)
      RETURNING id, ST_AsGeoJSON(location) AS location, description;
    `;
    const result = await this.pool.query(query, [location, description]);
    return result.rows[0];
  }

  async getPoints() {
    const query = `
      SELECT id, ST_AsGeoJSON(location) AS location, description
      FROM points;
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }

  async updatePoint(
    id: number,
    location: string | null,
    description: string | null,
  ) {
    const query = `
      UPDATE points
      SET location = COALESCE(ST_GeomFromGeoJSON($1), location),
          description = COALESCE($2, description)
      WHERE id = $3
      RETURNING id, ST_AsGeoJSON(location) AS location, description;
    `;
    const result = await this.pool.query(query, [location, description, id]);
    return result.rows[0] || null;
  }

  async deletePoint(id: number) {
    const query = `DELETE FROM points WHERE id = $1 RETURNING *;`;
    const result = await this.pool.query(query, [id]);
    return result.rows[0] || null;
  }
}
