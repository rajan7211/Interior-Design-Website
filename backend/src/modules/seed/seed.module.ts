import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { UsersModule } from '../users/users.module';
import { Project } from '../projects/entities/project.entity';
import { Service } from '../services/entities/service.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Project, Service]),
  ],
  providers: [SeedService],
})
export class SeedModule {}

