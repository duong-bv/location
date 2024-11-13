import { Body, Controller, Get, Post } from '@nestjs/common';
import { BuildingService } from './building.service';
import { Building } from './building.entity';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BuildingDto } from './dto/building.dto';

@Controller('buildings')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new building' })
  @ApiBody({ type: BuildingDto })
  @ApiResponse({
    status: 201,
    description: 'The building has been successfully created.',
    type: Building,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() buildingData: BuildingDto) {
    return this.buildingService.create(buildingData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all buildings' })
  @ApiResponse({
    status: 200,
    description: 'Retrieve all buildings.',
    type: [Building],
  })
  async findAll() {
    return this.buildingService.findAll();
  }
}
