import { ApiProperty } from '@nestjs/swagger';

export class Polygon {
  @ApiProperty({
    description: 'The unique identifier of the polygon',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'GeoJSON representation of the polygon area',
    example:
      '{"type":"Polygon","coordinates":[[[30,10],[40,40],[20,40],[10,20],[30,10]]]}',
  })
  area: string;

  @ApiProperty({
    description: 'Description of the polygon',
    example: 'A sample polygon description',
  })
  description: string;
}
