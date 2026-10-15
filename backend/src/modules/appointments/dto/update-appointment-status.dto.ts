import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AppointmentStatus } from '../../../common/enums/status.enum';

export class UpdateAppointmentStatusDto {
  @ApiProperty({ enum: AppointmentStatus, example: AppointmentStatus.CONFIRMED })
  @IsEnum(AppointmentStatus)
  @IsNotEmpty()
  status: AppointmentStatus;

  @ApiPropertyOptional({ example: 'https://meet.google.com/aur-arch-cns' })
  @IsString()
  @IsOptional()
  meetingLink?: string;
}

