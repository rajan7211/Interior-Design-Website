import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInquiryDto {
  @ApiProperty({ example: 'Lady Eleanor Vance' })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ example: 'eleanor@vancecapital.com' })
  @IsEmail({}, { message: 'A valid email address is required' })
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ example: '+1 (310) 849-2041' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'Penthouse Renovation in Tribeca' })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiProperty({ example: 'We recently acquired a 4,500 sq ft duplex loft in Tribeca and wish to engage Aurelle...' })
  @IsString()
  @IsNotEmpty({ message: 'Inquiry message is required' })
  message: string;
}

