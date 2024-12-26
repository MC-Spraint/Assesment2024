import { ApiProperty } from '@nestjs/swagger';
import { CommonResponse } from './common-response.dto';

export class commonSuccessResponse<T> extends CommonResponse {
  @ApiProperty({})
  data: T | null;
}
