import { ApiProperty } from '@nestjs/swagger';

export class Point {
  @ApiProperty({
    description: 'The unique identifier of the point',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The GeoJSON string representing the location of the point',
    example: '{"type":"Point","coordinates":[-77.0364,38.8951]}',
  })
  location: string;

  @ApiProperty({
    description: 'A brief description of the point',
    example: 'A popular tourist spot in Washington, DC.',
  })
  description: string;
}
