import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePointDto } from './dtos/create-point.dto';
import { DeletePointDto } from './dtos/delete-point.dto';
import { UpdatePointDto } from './dtos/update-point.dto';
import { PointsService } from './point.service';

@ApiTags('Points') // Grouping in Swagger
@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @ApiOperation({ summary: 'Create a new point' })
  @ApiResponse({
    status: 201,
    description: 'The point has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @Post()
  async createPoint(@Body() createPointDto: CreatePointDto) {
    return this.pointsService.createPoint(createPointDto);
  }

  @ApiOperation({ summary: 'Get all points' })
  @ApiResponse({ status: 200, description: 'List of all points.' })
  @Get()
  async getPoints() {
    return this.pointsService.getPoints();
  }

  @ApiOperation({ summary: 'Update an existing point' })
  @ApiResponse({
    status: 200,
    description: 'The point has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Point not found.' })
  @Patch(':id')
  async updatePoint(
    @Param('id') id: number,
    @Body() updatePointDto: UpdatePointDto,
  ) {
    return this.pointsService.updatePoint(id, updatePointDto);
  }

  @ApiOperation({ summary: 'Delete a point by ID' })
  @ApiResponse({
    status: 200,
    description: 'The point has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Point not found.' })
  @Delete(':id')
  async deletePoint(@Param('id') id: number) {
    const deletePointDto = new DeletePointDto();
    deletePointDto.id = id;
    return this.pointsService.deletePoint(deletePointDto);
  }
}
