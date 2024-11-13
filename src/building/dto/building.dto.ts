import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BuildingDto {
  @ApiProperty({
    description: 'The name of the building',
    example: 'A Car Park',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The address of the building',
    example: '123 Main St, City Center',
  })
  @IsString()
  address: string;
}
