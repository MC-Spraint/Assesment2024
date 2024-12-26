import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommonResponse } from 'src/core/utils/dtos/common-response.dto';
import { Type } from 'class-transformer';
import { Point } from '../entity/point.entity';

export class UpdatePointDto {
  @ApiPropertyOptional({
    description: 'The new GeoJSON string representing the location',
    example: '{"type":"Point","coordinates":[-77.0364,38.8951]}',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: 'The new description of the point',
    example: 'Updated description for the point.',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
export class UpdatePointResponse extends CommonResponse {
  @ApiProperty({
    description: 'Updated point',
    type: Point,
  })
  @Type(() => Point)
  data: Point;
}
