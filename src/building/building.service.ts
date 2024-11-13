import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Building } from './building.entity';
import { BuildingDto } from './dto/building.dto';

@Injectable()
export class BuildingService {
private readonly logger = new Logger(BuildingService.name);
  constructor(
    @InjectRepository(Building)
    private buildingRepository: Repository<Building>,
  ) {}

  // Create a new building
  async create(createBuildingDto: BuildingDto): Promise<Building> {
    this.logger.log(`Creating new building with data: ${JSON.stringify(createBuildingDto)}`);
    const queryRunner: QueryRunner = this.buildingRepository.manager.connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      // Create the building entity
      const building = this.buildingRepository.create(createBuildingDto);

      // Save the building within the transaction
      await queryRunner.manager.save(building);

      // Commit the transaction
      await queryRunner.commitTransaction();

      return building;
    } catch (error) {
      // If an error occurs, rollback the transaction
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to create building, transaction rolled back');
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // Get all buildings
  async findAll() {
    return this.buildingRepository.find();
  }
}
