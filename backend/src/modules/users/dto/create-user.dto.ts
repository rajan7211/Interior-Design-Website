import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../../common/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'admin@aurelleinteriors.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'aurelle2026', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Atelier Director' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ enum: Role, default: Role.ADMIN })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}

