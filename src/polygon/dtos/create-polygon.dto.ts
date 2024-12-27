import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Polygon } from '../entity/polygon.entity';
import { Type } from 'class-transformer';
import { CommonResponse } from 'src/core/utils/dtos/common-response.dto';

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
  @IsArray()
  @ArrayNotEmpty()
  coordinates: number[][][];
}

export class CreatePolygonDto {
  @ApiProperty({})
  @IsNotEmpty()
  @ValidateNested()
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
