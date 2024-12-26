import { ApiProperty } from '@nestjs/swagger';
import { CommonResponse } from './common-response.dto';

export class ErrorResponseDto extends CommonResponse {
  @ApiProperty({})
  error: string;

  @ApiProperty({})
  name: string;

  @ApiProperty({})
  path: string;

  @ApiProperty({})
  method: string;
}
