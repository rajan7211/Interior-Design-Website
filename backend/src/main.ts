import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('AtelierBootstrap');
  const app = await NestFactory.create(AppModule);

  // Security Headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  // Global API route prefix
  app.setGlobalPrefix('api');

  // CORS configuration
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Accept,Authorization',
  });

  // Global DTO Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Centralized Error Filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('AURELLE Interiors Atelier API')
    .setDescription(
      'Comprehensive REST API for AURELLE Interiors luxury architectural studio, project showcases, client inquiries, consultation scheduling, and administrative pipeline management.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT Bearer token obtained from /api/auth/login',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Authentication', 'Atelier Director authentication and credential verification')
    .addTag('Projects', 'Architectural portfolio commissions and room showcases')
    .addTag('Services', 'Atelier design offerings, deliverables, and retainers')
    .addTag('Inquiries', 'Client contact requests and relationship management')
    .addTag('Appointments', 'Private architectural consultations and space assessments')
    .addTag('Uploads', 'High-resolution project photography and CDN management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'AURELLE Interiors API Documentation',
    customCss: `
      .swagger-ui .topbar { background-color: #181716; }
      .swagger-ui .topbar-wrapper img { content: url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=100&q=80'); border-radius: 50%; }
      .swagger-ui .info h2 { font-family: serif; color: #181716; }
    `,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`AURELLE Interiors Atelier API running at http://localhost:${port}/api`);
  logger.log(`Swagger Interactive Documentation available at http://localhost:${port}/api/docs`);
}

bootstrap();
