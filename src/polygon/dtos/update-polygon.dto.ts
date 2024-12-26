import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Polygon } from '../entity/polygon.entity';
import { Type } from 'class-transformer';
import { CommonResponse } from 'src/core/utils/dtos/common-response.dto';

export class UpdatePolygonDto {
  @ApiPropertyOptional({
    description: 'GeoJSON representation of the polygon area (optional)',
    example:
      '{"type":"Polygon","coordinates":[[[30,10],[40,40],[20,40],[10,20],[30,10]]]}',
  })
  @IsString()
  @IsOptional()
  area?: string;

  @ApiPropertyOptional({
    description: 'Description of the polygon (optional)',
    example: 'An updated polygon description',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
export class UpdatePolygonResponse extends CommonResponse {
  @ApiProperty({
    description: 'Updated polygon',
    type: Polygon,
  })
  @Type(() => Polygon)
  data: Polygon;
}
