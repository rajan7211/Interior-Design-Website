import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'The Serpentine Residence' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'serpentine-residence' })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ example: 'Living Room' })
  @IsString()
  @IsNotEmpty()
  roomType: string;

  @ApiProperty({ example: 'Residential' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'Bel Air, California' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiPropertyOptional({ example: 2026 })
  @IsNumber()
  @IsOptional()
  year?: number;

  @ApiPropertyOptional({ example: '4,200 sq.ft' })
  @IsString()
  @IsOptional()
  area?: string;

  @ApiPropertyOptional({ example: 'Private Client' })
  @IsString()
  @IsOptional()
  client?: string;

  @ApiPropertyOptional({ example: 'A minimalist sanctuary celebrating light, raw travertine, and bespoke walnut cabinetry.' })
  @IsString()
  @IsOptional()
  shortDescription?: string;

  @ApiProperty({ example: 'Conceived as an architectural dialogue between indoor serenity and sunlit Californian panoramas...' })
  @IsString()
  @IsNotEmpty()
  fullDescription: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80' })
  @IsString()
  @IsNotEmpty()
  coverImage: string;

  @ApiProperty({ example: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'] })
  @IsArray()
  @IsString({ each: true })
  gallery: string[];

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}

