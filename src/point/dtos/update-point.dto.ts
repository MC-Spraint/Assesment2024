import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePointDto {
  @ApiPropertyOptional({
    description: 'The new GeoJSON string representing the location',
    example: '{"type":"Point","coordinates":[-77.0364,38.8951]}',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    description: 'The new description of the point',
    example: 'Updated description for the point.',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
