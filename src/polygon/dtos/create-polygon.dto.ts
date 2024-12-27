import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Polygon } from '../entity/polygon.entity';
import { Type } from 'class-transformer';
import { CommonResponse } from 'src/core/utils/dtos/common-response.dto';

// Define the class for the Area (Polygon) GeoJSON representation
export class AreaDto {
  @ApiProperty({
    example: 'Polygon',
  })
  @IsNotEmpty()
  @IsString()
  type: 'Polygon';

  @ApiProperty({
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
    example: 'A popular tourist spot with a large park in Washington, DC.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreatePolygonResponse extends CommonResponse {
  @ApiProperty({})
  @Type(() => Polygon)
  data: Polygon;
}
