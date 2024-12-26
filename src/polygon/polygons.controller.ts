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
import { PolygonsService } from './polygons.service';
import {
  CreatePolygonDto,
  CreatePolygonResponse,
} from './dtos/create-polygon.dto';
import {
  UpdatePolygonDto,
  UpdatePolygonResponse,
} from './dtos/update-polygon.dto';
import { UtilService } from 'src/core/utils/util.service';
import { Response } from 'express';
import { Polygon } from './entity/polygon.entity';
import { SuccessResponse } from 'src/core/utils/dtos/success-response.enum';
import { CommonErrorResponseDto } from 'src/core/utils/dtos/common-error-response.dto';
import { DeletePolygonResponse } from './dtos/delete-polygon.dto';

@ApiTags('Polygons') // Grouping in Swagger
@Controller('polygons')
export class PolygonsController {
  constructor(
    private readonly polygonsService: PolygonsService,
    private readonly _utilService: UtilService,
  ) {}

  @ApiOperation({ summary: 'Create a new polygon' })
  @ApiBody({ type: CreatePolygonDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create polygon!',
    type: CreatePolygonResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Post()
  async createPoint(
    @Res() res: Response,
    @Body() createPolygonDto: CreatePolygonDto,
  ): Promise<Response<CreatePolygonResponse>> {
    const result = await this.polygonsService.createPolygon(createPolygonDto);
    const response = this._utilService.successResponse<Polygon>(
      SuccessResponse.CREATED,
      'Polygon Created!',
      result,
    );
    return res.status(HttpStatus.CREATED).json(response);
  }

  @ApiOperation({ summary: 'Get all polygons' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all polygons',
    type: CreatePolygonResponse,
  })
  @Get()
  async getPolygons(@Res() res: Response): Promise<Response<Polygon[]>> {
    const result = await this.polygonsService.getPolygons();
    const response = this._utilService.successResponse<Polygon[]>(
      SuccessResponse.OK,
      'List of polygons',
      result,
    );
    return res.status(HttpStatus.OK).json(response);
  }

  @ApiOperation({ summary: 'Update an existing polygon' })
  @ApiBody({ type: UpdatePolygonDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The polygon has been successfully updated.',
    type: UpdatePolygonResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Polygon not found.',
    type: CommonErrorResponseDto,
  })
  @ApiResponse({ status: 404, description: 'polygon not found.' })
  @Patch(':id')
  async updatePoint(
    @Res() res: Response,
    @Param('id') id: number,
    @Body() updatePolygonDto: UpdatePolygonDto,
  ): Promise<Response<UpdatePolygonResponse>> {
    const result = await this.polygonsService.updatePolygon(
      id,
      updatePolygonDto,
    );
    const response = this._utilService.successResponse<Polygon>(
      SuccessResponse.OK,
      'Polygon Updated!',
      result,
    );
    return res.status(HttpStatus.OK).json(response);
  }

  @ApiOperation({ summary: 'Delete a polygon by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The polygon has been successfully deleted.',
    type: UpdatePolygonResponse,
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
  ): Promise<Response<DeletePolygonResponse>> {
    const result = await this.polygonsService.deletePolygon(id);
    const message = 'Point Deleted';
    const response = this._utilService.successResponse<Partial<Polygon>>(
      SuccessResponse.OK,
      message,
      result,
    );
    return res.status(HttpStatus.OK).json(response);
  }
  @ApiResponse({
    status: 200,
    description: 'The polygon has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Polygon not found.' })
  @Delete(':id')
  async deletePolygon(@Param('id') id: number) {
    return this.polygonsService.deletePolygon(id);
  }
}
