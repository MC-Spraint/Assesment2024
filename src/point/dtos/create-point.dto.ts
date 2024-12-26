import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CommonResponse } from 'src/core/utils/dtos/common-response.dto';
import { Point } from '../entity/point.entity';

export class CreatePointDto {
  @ApiProperty({
    description: 'The GeoJSON string representing the location',
    example: '{"type":"Point","coordinates":[-77.0364,38.8951]}',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: 'A brief description of the point',
    example: 'A popular tourist spot in Washington, DC.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
export class CreatePointResponse extends CommonResponse {
  @ApiProperty({
    description: 'Create point',
    type: Point,
  })
  @Type(() => Point)
  data: Point;
}
