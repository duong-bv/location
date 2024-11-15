import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { Location } from './location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]), // Register the Location entity here
  ],
  providers: [LocationsService],
  controllers: [LocationsController]
})
export class LocationsModule {}
