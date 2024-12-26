import { IsNotEmpty, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Point } from '../entity/point.entity';
import { Type } from 'class-transformer';
import { CommonResponse } from 'src/core/utils/dtos/common-response.dto';

export class DeletePointDto {
  @ApiProperty({
    description: 'The unique identifier of the point to delete',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;
}
export class DeletePointResponse extends CommonResponse {
  @ApiProperty({
    description: 'Point deleted',
    type: Point,
  })
  @Type(() => Point)
  data: Point;
}
