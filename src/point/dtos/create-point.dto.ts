import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CommonResponse } from 'src/core/utils/dtos/common-response.dto';
import { Point } from '../entity/point.entity';

export class LocationDTO {
  @ApiProperty({
    description: 'The type of the GeoJSON object, e.g., "Point"',
    example: 'Point',
  })
  @IsNotEmpty()
  @IsString()
  type: 'Point';

  @ApiProperty({
    description:
      'The coordinates of the point as an array of numbers [longitude, latitude]',
    example: [-77.0364, 38.8951],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  // @IsNumber({}, { each: true })
  // @Type(() => Number)
  coordinates: [number, number];
}

export class CreatePointDto {
  @ApiProperty({
    description: 'The GeoJSON object representing the location of the point',
    example: '{"type":"Point","coordinates":[-77.0364,38.8951]}',
  })
  @IsNotEmpty()
  @Type(() => LocationDTO)
  location: LocationDTO;

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
