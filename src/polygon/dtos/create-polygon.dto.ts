import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Polygon } from '../entity/polygon.entity';
import { Type } from 'class-transformer';
import { CommonResponse } from 'src/core/utils/dtos/common-response.dto';

export class CreatePolygonDto {
  @ApiProperty({
    description: 'GeoJSON representation of the polygon area',
    example:
      '{"type":"Polygon","coordinates":[[[30,10],[40,40],[20,40],[10,20],[30,10]]]}',
  })
  @IsString()
  @IsNotEmpty()
  area: string;

  @ApiProperty({
    description: 'Description of the polygon',
    example: 'A sample polygon description',
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
