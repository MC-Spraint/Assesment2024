import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Polygon } from '../entity/polygon.entity';
import { Type } from 'class-transformer';
import { CommonResponse } from 'src/core/utils/dtos/common-response.dto';
import { AreaDto } from './create-polygon.dto';

export class UpdatePolygonDto {
  @ApiProperty({
    description: 'The GeoJSON object representing the area (polygon)',
    example: {
      type: 'Polygon',
      coordinates: [
        [
          [-77.0367, 38.8924],
          [-77.0364, 38.8941],
          [-77.0354, 38.8946],
          [-77.0351, 38.8951],
          [-77.0363, 38.8964],
        ],
      ],
    },
  })
  @IsOptional()
  @Type(() => AreaDto)
  area?: AreaDto;

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
