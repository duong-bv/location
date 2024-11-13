import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Location } from 'src/locations/location.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Building {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier of the building' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Name of the building' })
  name: string;

  @Column()
  @ApiProperty({ description: 'Address of the building' })
  address: string;

  @OneToMany(() => Location, (location) => location.building)
  locations: Location[];
}
