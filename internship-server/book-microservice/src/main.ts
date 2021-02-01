import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { book_host } from './config';

const logger = new Logger('Book Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      host: book_host,
      port: 3004,
    }
  });

  await app.startAllMicroservicesAsync();

  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('Book Service')
    .setDescription('CRUD operations on Books')
    .setVersion('1.0')
    .addTag('book service')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3003);
}

bootstrap();