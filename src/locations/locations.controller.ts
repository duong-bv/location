import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from './location.entity';
import { LocationDto } from './dto/LocationDto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get list all location' })
  @ApiResponse({ status: 200, description: 'List of all locations', type: [Location] })
  async getAllLocations(): Promise<Location[]> {
    return this.locationsService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get location by ID' }) // Brief description of the endpoint
  @ApiParam({ name: 'id', type: String, description: 'ID of the location' }) // Adds documentation for the parameter
  @ApiResponse({ status: 200, description: 'Location found', type: Location }) // Successful response details
  @ApiResponse({ status: 404, description: 'Location not found' })
  async getLocation(@Param('id') id: string): Promise<Location> {
    return this.locationsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiBody({ type: LocationDto }) // Specifies the DTO for the request body
  @ApiResponse({ status: 201, description: 'Location created successfully', type: Location })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createLocation(@Body() locationData: LocationDto): Promise<Location> {
    return this.locationsService.create(locationData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a location by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the location to update' })
  @ApiBody({ type: LocationDto }) // Specifies the DTO for the request body
  @ApiResponse({ status: 200, description: 'Location updated successfully', type: Location })
  @ApiResponse({ status: 404, description: 'Location not found' })
  async updateLocation(
    @Param('id') id: string,
    @Body() locationData: LocationDto,
  ): Promise<Location> {
    return this.locationsService.update(id, locationData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete location' })
  async deleteLocation(@Param('id') id: string): Promise<void> {
    return this.locationsService.delete(id);
  }
}
