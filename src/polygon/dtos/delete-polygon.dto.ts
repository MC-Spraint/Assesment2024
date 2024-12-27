import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommonResponse } from 'src/core/utils/dtos/common-response.dto';
import { Polygon } from '../entity/polygon.entity';
import { Type } from 'class-transformer';

export class DeletePolygonDto {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  id: number;
}
export class DeletePolygonResponse extends CommonResponse {
  @ApiProperty({})
  @Type(() => Polygon)
  data: Polygon;
}
