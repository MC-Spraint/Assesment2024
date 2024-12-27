import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Polygon } from '../entity/polygon.entity';
import { Type } from 'class-transformer';
import { CommonResponse } from 'src/core/utils/dtos/common-response.dto';
import { AreaDto } from './create-polygon.dto';

export class UpdatePolygonDto {
  @ApiProperty({})
  @IsOptional()
  @ValidateNested()
  @Type(() => AreaDto)
  area?: AreaDto;

  @ApiPropertyOptional({
    example: 'Updated polygon description',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
export class UpdatePolygonResponse extends CommonResponse {
  @ApiProperty({})
  @Type(() => Polygon)
  data: Polygon;
}
