import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: 'Complete Interior Architecture' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'complete-interior-architecture' })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ example: 'Comprehensive end-to-end design for prime residential and private commercial commissions.' })
  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @ApiProperty({ example: 'Our holistic design journey oversees every stage from architectural spacial layout...' })
  @IsString()
  @IsNotEmpty()
  fullDescription: string;

  @ApiProperty({ example: ['Structural space planning', 'Custom millwork detailing', 'Full turnkey procurement'] })
  @IsArray()
  @IsString({ each: true })
  features: string[];

  @ApiPropertyOptional({ example: 'compass' })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiPropertyOptional({ example: 'Starting from $15,000' })
  @IsString()
  @IsOptional()
  startingPrice?: string;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

