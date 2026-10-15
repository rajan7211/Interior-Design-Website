import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InquiryStatus } from '../../../common/enums/status.enum';

export class UpdateInquiryStatusDto {
  @ApiProperty({ enum: InquiryStatus, example: InquiryStatus.IN_PROGRESS })
  @IsEnum(InquiryStatus)
  @IsNotEmpty()
  status: InquiryStatus;

  @ApiPropertyOptional({ example: 'Client consultation scheduled for next Thursday.' })
  @IsString()
  @IsOptional()
  notes?: string;
}

