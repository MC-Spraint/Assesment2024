import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreatePointDto, CreatePointResponse } from './dtos/create-point.dto';
import { DeletePointResponse } from './dtos/delete-point.dto';
import { UpdatePointDto, UpdatePointResponse } from './dtos/update-point.dto';
import { PointsService } from './point.service';
import { Response } from 'express';
import { UtilService } from 'src/core/utils/util.service';
import { SuccessResponse } from 'src/core/utils/dtos/success-response.enum';
import { Point } from './entity/point.entity';
import { CommonErrorResponseDto } from 'src/core/utils/dtos/common-error-response.dto';

@ApiTags('Points') // Grouping in Swagger
@Controller('points')
export class PointsController {
  constructor(
    private readonly pointsService: PointsService,
    private readonly _utilService: UtilService,
  ) {}

  @ApiOperation({ summary: 'Create a new point' })
  @ApiBody({ type: CreatePointDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create task!',
    type: CreatePointResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid Input!',
    type: CommonErrorResponseDto,
  })
  @Post()
  async createPoint(
    @Res() res: Response,
    @Body() createPointDto: CreatePointDto,
  ): Promise<Response<CreatePointResponse>> {
    const result = await this.pointsService.createPoint(createPointDto);
    const response = this._utilService.successResponse<Point>(
      SuccessResponse.CREATED,
      'Point Created!',
      result,
    );
    return res.status(HttpStatus.CREATED).json(response);
  }

  @ApiOperation({ summary: 'Get points' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get points',
    type: CreatePointResponse,
  })
  @Get()
  async getPoints(@Res() res: Response): Promise<Response<Point[]>> {
    const result = await this.pointsService.getPoints();
    const response = this._utilService.successResponse<Point[]>(
      SuccessResponse.OK,
      'List of points',
      result,
    );
    return res.status(HttpStatus.OK).json(response);
  }

  @ApiOperation({ summary: 'Update an existing point' })
  @ApiBody({ type: UpdatePointDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The point has been successfully updated.',
    type: UpdatePointResponse,
  })
  @ApiResponse({ status: 404, description: 'Point not found.' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid Input!',
    type: CommonErrorResponseDto,
  })
  @Patch(':id')
  async updatePoint(
    @Res() res: Response,
    @Param('id') id: number,
    @Body() updatePointDto: UpdatePointDto,
  ): Promise<Response<UpdatePointResponse>> {
    const result = await this.pointsService.updatePoint(id, updatePointDto);
    const response = this._utilService.successResponse<Point>(
      SuccessResponse.OK,
      'Point Updated!',
      result,
    );
    return res.status(HttpStatus.OK).json(response);
  }

  @ApiOperation({ summary: 'Delete a point by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The point has been successfully deleted.',
    type: UpdatePointResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Polygon not found.',
    type: CommonErrorResponseDto,
  })
  @Delete(':id')
  async deletePoint(
    @Res() res: Response,
    @Param('id') id: number,
  ): Promise<Response<DeletePointResponse>> {
    const result = await this.pointsService.deletePoint(id);
    const message = 'Point Deleted';
    const response = this._utilService.successResponse<Partial<Point>>(
      SuccessResponse.OK,
      message,
      result,
    );
    return res.status(HttpStatus.OK).json(response);
  }
}
