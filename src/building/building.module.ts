import { Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { Building } from './building.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Building]), // Register the Location entity here
  ],
  providers: [BuildingService],
  controllers: [BuildingController]
})
export class BuildingModule {}
