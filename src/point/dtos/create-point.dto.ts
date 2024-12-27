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
    example: 'Point',
  })
  @IsNotEmpty()
  @IsString()
  type: 'Point';

  @ApiProperty({
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
    example: { type: 'Point', coordinates: [-77.0364, 38.8951] },
  })
  @IsNotEmpty()
  @Type(() => LocationDTO)
  location: LocationDTO;

  @ApiProperty({
    example: 'A popular tourist spot in Washington, DC.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CreatePointResponse extends CommonResponse {
  @ApiProperty({})
  @Type(() => Point)
  data: Point;
}
