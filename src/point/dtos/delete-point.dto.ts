import { IsNotEmpty, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeletePointDto {
  @ApiProperty({
    description: 'The unique identifier of the point to delete',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;
}
