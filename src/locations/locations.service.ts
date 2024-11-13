import { Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner, DataSource } from 'typeorm';
import { LocationDto } from './dto/LocationDto';
import { Location } from './location.entity';

@Injectable()
export class LocationsService {
  private readonly logger = new Logger(LocationsService.name);
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    private readonly dataSource: DataSource,
  ) {}

  async getAll(): Promise<Location[]> {
    this.logger.log('Fetching all locations');
    try {
      const locations = await this.locationRepository.find({
        relations: ['parent', 'children'],
      });
      this.logger.log(`Fetched ${locations.length} locations`);
      return locations;
    } catch (error) {
      this.logger.error('Failed to fetch locations', error.stack);
      throw new InternalServerErrorException('Failed to fetch locations');
    }
  }

  async findOne(id: string): Promise<Location> {
    this.logger.log(`Fetching location with ID: ${id}`);
    try {
      const location = await this.locationRepository.findOne({
        where: { id },
        relations: ['parent', 'children'], // Adjust relations as needed
      });

      if (!location) {
        this.logger.warn(`Location with ID ${id} not found`);
        throw new NotFoundException(`Location with ID ${id} not found`);
      }

      this.logger.log(`Location with ID ${id} fetched successfully`);
      return location;
    } catch (error) {
      this.logger.error(`Failed to fetch location with ID ${id}`, error.stack);
      throw error;
    }
  }

  async create(locationData: LocationDto): Promise<Location> {
    // log
    this.logger.log(`Creating new location with data: ${JSON.stringify(locationData)}`);

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    // Establish real database connection using our new query runner
    await queryRunner.connect();
    // Start a transaction
    await queryRunner.startTransaction();

    try {
      // Find the parent location if `parentId` is provided
      let parentLocation: Location | null = null;
      if (locationData.parentId) {
        parentLocation = await queryRunner.manager.findOne(Location, {
          where: { id: locationData.parentId },
        });
        
        if (!parentLocation) {
          throw new Error('Parent location not found');
        }
      }
      // Create a new location and save it using the query runner
      const newLocation = queryRunner.manager.create(Location, {
        ...locationData,
        parent: parentLocation,
      });
      await queryRunner.manager.save(Location, newLocation);

      // Commit the transaction if everything goes well
      await queryRunner.commitTransaction();
      return newLocation;
    } catch (error) {
      // Rollback the transaction on error
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to create location, transaction rolled back');
    } finally {
      // Release the query runner to prevent memory leaks
      await queryRunner.release();
    }
  }

  async update(id: string, updateData: Partial<LocationDto>): Promise<Location> {
    // log
    this.logger.log(`Updating location with ID: ${id}`);
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      // Find the location to update
      const locationToUpdate = await queryRunner.manager.findOne(Location, {
        where: { id },
        relations: ['parent'],
      });
  
      if (!locationToUpdate) {
        throw new NotFoundException('Location not found');
      }
  
      // If `parentId` is provided, find and set the parent entity
      if (updateData.parentId) {
        const parentLocation = await queryRunner.manager.findOne(Location, {
          where: { id: updateData.parentId },
        });
  
        if (!parentLocation) {
          throw new NotFoundException('Parent location not found');
        }
  
        locationToUpdate.parent = parentLocation;
      }
  
      // Update other fields
      queryRunner.manager.merge(Location, locationToUpdate, updateData);
  
      // Save changes
      const updatedLocation = await queryRunner.manager.save(Location, locationToUpdate);
      await queryRunner.commitTransaction();
      return updatedLocation;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Error updating location:', error);
      throw new InternalServerErrorException('Failed to update location, transaction rolled back');
    } finally {
      await queryRunner.release();
    }
  }
  

  async delete(id: string): Promise<void> {
    this.logger.log(`Attempting to delete location with ID: ${id}`);
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find the location to ensure it exists
      const locationToDelete = await queryRunner.manager.findOne(Location, {
        where: { id },
        relations: ['children'],
      });

      if (!locationToDelete) {
        throw new NotFoundException('Location not found');
      }

      // If the location has children, handle the deletion or reassignment logic
      if (locationToDelete.children && locationToDelete.children.length > 0) {
        throw new Error('Cannot delete a location with child locations. Please delete or reassign children first.');
      }

      // Delete the location
      await queryRunner.manager.delete(Location, id);

      // Commit the transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // Rollback the transaction in case of error
      await queryRunner.rollbackTransaction();
      this.logger.error('Error deleting location:', error);
      throw new InternalServerErrorException('Failed to delete location, transaction rolled back');
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }
}
