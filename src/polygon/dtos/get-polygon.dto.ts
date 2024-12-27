import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CommonResponse } from 'src/core/utils/dtos/common-response.dto';
import { Polygon } from '../entity/polygon.entity';

export class GetPolygonsResponse extends CommonResponse {
  @ApiProperty({
    description: 'List of polygons retrieved',
    type: [Polygon],
  })
  @Type(() => Array<Polygon>)
  data: Polygon[];
}
