import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePointDto {
  @ApiProperty({
    description: 'The GeoJSON string representing the location',
    example: '{"type":"Point","coordinates":[-77.0364,38.8951]}',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: 'A brief description of the point',
    example: 'A popular tourist spot in Washington, DC.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
