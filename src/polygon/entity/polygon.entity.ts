import { ApiProperty } from '@nestjs/swagger';

export class Area {
  @ApiProperty({})
  type: 'Polygon';

  @ApiProperty({})
  coordinates: number[][][]; // Coordinates for polygon are usually an array of arrays of points
}
export class Polygon {
  @ApiProperty({})
  id: number;

  @ApiProperty({})
  area: Area;

  @ApiProperty({})
  description: string;
}
