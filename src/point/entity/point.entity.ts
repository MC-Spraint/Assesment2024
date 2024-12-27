import { ApiProperty } from '@nestjs/swagger';

export class Location {
  @ApiProperty({})
  type: string;

  @ApiProperty({})
  coordinates: number[];
}

export class Point {
  @ApiProperty({})
  id: number;

  @ApiProperty({})
  location: Location;

  @ApiProperty({})
  description: string;
}
