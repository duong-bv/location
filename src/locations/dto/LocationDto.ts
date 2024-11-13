import { IsString, IsOptional, IsUUID, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @IsString()
  @ApiProperty({ description: 'Name of the location' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'Location Number for the location' })
  number: string;

  @IsNumber()
  @ApiProperty({ description: 'Area of the location' })
  area: number;

  @IsOptional()
  @ApiProperty({ description: 'Parent location ID', required: false })
  @IsUUID()
  parentId?: string;
}
