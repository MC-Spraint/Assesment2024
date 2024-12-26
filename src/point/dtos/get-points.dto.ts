import { ApiProperty } from '@nestjs/swagger';
import { Point } from '../entity/point.entity';
import { Type } from 'class-transformer';
import { CommonResponse } from 'src/core/utils/dtos/common-response.dto';

export class GetPointsResponse extends CommonResponse {
  @ApiProperty({
    description: 'List of points retrieved',
    type: [Point],
  })
  @Type(() => Point)
  data: Point[];
}
