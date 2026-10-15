import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ example: 'Julianne Sterling' })
  @IsString()
  @IsNotEmpty({ message: 'Client name is required' })
  name: string;

  @ApiProperty({ example: 'jsterling@sterlingmedia.com' })
  @IsEmail({}, { message: 'A valid email address is required' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+1 (415) 392-1084' })
  @IsString()
  @IsNotEmpty({ message: 'Contact phone number is required' })
  phone: string;

  @ApiPropertyOptional({ example: 'Pacific Heights, San Francisco' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ example: 'Penthouse Residence' })
  @IsString()
  @IsOptional()
  roomType?: string;

  @ApiPropertyOptional({ example: '$100,000 - $250,000' })
  @IsString()
  @IsOptional()
  budget?: string;

  @ApiPropertyOptional({ example: '2026-11-15' })
  @IsString()
  @IsOptional()
  preferredDate?: string;

  @ApiPropertyOptional({ example: 'Afternoon (1:00 PM - 5:00 PM)' })
  @IsString()
  @IsOptional()
  preferredTime?: string;

  @ApiPropertyOptional({ example: 'Complete spatial remodel of 3,200 sq.ft Victorian flat with bespoke minimalist finishes.' })
  @IsString()
  @IsOptional()
  requirements?: string;
}

