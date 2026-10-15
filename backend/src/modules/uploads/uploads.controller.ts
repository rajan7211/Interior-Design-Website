import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Get,
  Param,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import type { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { UploadsService } from './uploads.service';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload project or portfolio photography' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Image successfully uploaded to Cloudinary or Atelier CDN' })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.uploadImage(file);
  }

  @Public()
  @Get('files/:filename')
  @ApiOperation({ summary: 'Serve locally cached image asset' })
  serveFile(@Param('filename') filename: string, @Res() res: Response) {
    const sanitized = path.basename(filename);
    const filePath = path.resolve(process.cwd(), 'uploads', sanitized);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Requested asset not found on atelier server');
    }

    return res.sendFile(filePath);
  }
}
