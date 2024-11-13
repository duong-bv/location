import { ApiProperty } from '@nestjs/swagger';
import { Building } from 'src/building/building.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier of the location' })
  id: string;

  @Column()
  @ApiProperty({ description: 'Location Name of the location' })
  name: string;

  @Column()
  @ApiProperty({ description: 'Location Number of the location' })
  number: string;

  @Column()
  @ApiProperty({ description: 'Area of the location', example: '80.620 m²' })
  area: Number;

  @ManyToOne(() => Location, (location) => location.children, { nullable: true })
  parent: Location;

  @OneToMany(() => Location, (location) => location.parent)
  children: Location[];

   @ManyToOne(() => Building, (building) => building.locations)
   building: Building;
}
