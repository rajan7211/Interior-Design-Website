import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../modules/users/entities/user.entity';
import { Project } from '../modules/projects/entities/project.entity';
import { Service } from '../modules/services/entities/service.entity';
import { Inquiry } from '../modules/inquiries/entities/inquiry.entity';
import { Appointment } from '../modules/appointments/entities/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const dbConfig = config.get('database');
        if (dbConfig.url) {
          return {
            type: 'postgres',
            url: dbConfig.url,
            ssl: dbConfig.ssl,
            entities: [User, Project, Service, Inquiry, Appointment],
            synchronize: dbConfig.synchronize,
            autoLoadEntities: true,
          };
        }

        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          ssl: dbConfig.ssl,
          entities: [User, Project, Service, Inquiry, Appointment],
          synchronize: dbConfig.synchronize,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}

