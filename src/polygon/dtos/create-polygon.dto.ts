import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Polygon } from '../entity/polygon.entity';
import { Type } from 'class-transformer';
import { CommonResponse } from 'src/core/utils/dtos/common-response.dto';

// Define the class for the Area (Polygon) GeoJSON representation
export class AreaDto {
  @ApiProperty({
    description: 'The type of the GeoJSON object, e.g., "Polygon"',
    example: 'Polygon',
  })
  @IsNotEmpty()
  @IsString()
  type: 'Polygon';

  @ApiProperty({
    description:
      'The coordinates of the polygon as an array of arrays of numbers (latitude, longitude)',
    example: [
      [
        [-77.0364, 38.8951],
        [-77.0364, 38.8961],
        [-77.0354, 38.8961],
        [-77.0354, 38.8951],
        [-77.0364, 38.8951],
      ],
    ],
  })
  @IsNotEmpty()
  @ArrayNotEmpty()
  @IsArray()
  coordinates: number[][][];
}

export class CreatePolygonDto {
  @ApiProperty({
    description: 'The GeoJSON object representing the area (polygon)',
    example: {
      type: 'Polygon',
      coordinates: [
        [
          [-77.0364, 38.8951],
          [-77.0364, 38.8961],
          [-77.0354, 38.8961],
          [-77.0354, 38.8951],
          [-77.0364, 38.8951],
        ],
      ],
    },
  })
  @IsNotEmpty()
  @Type(() => AreaDto)
  area: AreaDto;

  @ApiProperty({
    description: 'A brief description of the area',
    example: 'A popular tourist spot with a large park in Washington, DC.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreatePolygonResponse extends CommonResponse {
  @ApiProperty({
    description: 'Create polygon',
    type: Polygon,
  })
  @Type(() => Polygon)
  data: Polygon;
}
