import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommonResponse } from 'src/core/utils/dtos/common-response.dto';
import { Type } from 'class-transformer';
import { Point } from '../entity/point.entity';
import { LocationDTO } from './create-point.dto';

export class UpdatePointDto {
  @ApiPropertyOptional({
    example: { type: 'Point', coordinates: [-77.0364, 38.8951] },
  })
  @IsOptional()
  @Type(() => LocationDTO)
  location?: LocationDTO;

  @ApiProperty({
    example: 'Updated description for the point.',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
export class UpdatePointResponse extends CommonResponse {
  @ApiProperty({})
  @Type(() => Point)
  data: Point;
}
