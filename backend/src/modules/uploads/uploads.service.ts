import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadsService {
  private readonly logger = new Logger(UploadsService.name);
  private isCloudinaryConfigured = false;
  private readonly uploadDir = path.resolve(process.cwd(), 'uploads');

  constructor(private configService: ConfigService) {
    const cloudName = this.configService.get('cloudinary.cloudName');
    const apiKey = this.configService.get('cloudinary.apiKey');
    const apiSecret = this.configService.get('cloudinary.apiSecret');

    if (cloudName && apiKey && apiSecret) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
      });
      this.isCloudinaryConfigured = true;
      this.logger.log(`Cloudinary storage active for cloud '${cloudName}'`);
    } else {
      this.logger.log('Cloudinary credentials not provided. Using local disk upload fallback.');
      if (!fs.existsSync(this.uploadDir)) {
        fs.mkdirSync(this.uploadDir, { recursive: true });
      }
    }
  }

  async uploadImage(file: Express.Multer.File): Promise<{ url: string; publicId: string; originalName: string }> {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(`Invalid file type ${file.mimetype}. Permitted types: JPG, PNG, WEBP, AVIF.`);
    }

    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      throw new BadRequestException('File size exceeds the 10MB limit');
    }

    if (this.isCloudinaryConfigured) {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'aurelle_interiors',
            resource_type: 'image',
          },
          (error, result) => {
            if (error || !result) {
              this.logger.error('Cloudinary upload failure:', error);
              return reject(new BadRequestException('Cloud image upload failed'));
            }
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
              originalName: file.originalname,
            });
          },
        );
        uploadStream.end(file.buffer);
      });
    }

    // Local Disk Fallback
    const ext = path.extname(file.originalname) || '.jpg';
    const filename = `${uuidv4()}${ext}`;
    const filePath = path.join(this.uploadDir, filename);

    await fs.promises.writeFile(filePath, file.buffer);

    const port = this.configService.get('port') || 3000;
    const url = `http://localhost:${port}/api/uploads/files/${filename}`;

    return {
      url,
      publicId: filename,
      originalName: file.originalname,
    };
  }
}

