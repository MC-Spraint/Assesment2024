import { Injectable } from '@nestjs/common';
import { SuccessResponseCode } from './dtos/success-response-code.enum';
import { SuccessResponse } from './dtos/success-response.enum';
import { commonSuccessResponse } from './dtos/common-success-response';
import { SuccessResponseMap } from './dtos/success-response.map';

@Injectable()
export class UtilService {
  private response<T>(
    success: boolean,
    responseCode: number,
    response: SuccessResponse,
    message: string,
    data: T,
    extra?: any,
  ): commonSuccessResponse<T> {
    if (!extra) {
      return {
        success: success,
        response_code: responseCode,
        response: response,
        message: message,
        data: data,
      };
    } else {
      return {
        success: success,
        response_code: responseCode,
        response: response,
        message: message,
        ...extra,
        data: data,
      };
    }
  }
  private customSuccessResponse<T>(
    responseCode: SuccessResponseCode,
    response: SuccessResponse,
    message: string,
    data: T,
    extra?: any,
  ): commonSuccessResponse<T> {
    if (!extra) {
      return this.response<T>(true, responseCode, response, message, data);
    } else {
      const res = this.response<T>(
        true,
        responseCode,
        response,
        message,
        data,
        extra,
      );
      return res;
    }
  }
  public successResponseOk<T>(
    message: string,
    data: T,
    extra?: any,
  ): commonSuccessResponse<T> {
    if (!extra) {
      return this.customSuccessResponse<T>(
        SuccessResponseCode.OK,
        SuccessResponse.OK,
        message,
        data,
      );
    } else {
      const res = this.customSuccessResponse<T>(
        SuccessResponseCode.OK,
        SuccessResponse.OK,
        message,
        data,
        extra,
      );
      return res;
    }
  }
  public successResponseCreated<T>(
    message: string,
    data: T,
    extra?: any,
  ): commonSuccessResponse<T> {
    if (!extra) {
      return this.customSuccessResponse<T>(
        SuccessResponseCode.CREATED,
        SuccessResponse.CREATED,
        message,
        data,
      );
    } else {
      const res = this.customSuccessResponse<T>(
        SuccessResponseCode.CREATED,
        SuccessResponse.CREATED,
        message,
        data,
        extra,
      );
      return res;
    }
  }
  public successResponse<T>(
    sucRes: SuccessResponse,
    message: string,
    data: T,
    extra?: any,
  ): commonSuccessResponse<T> {
    return this.customSuccessResponse<T>(
      SuccessResponseMap.get(sucRes) as SuccessResponseCode,
      sucRes,
      message,
      data,
      extra,
    );
  }
}
