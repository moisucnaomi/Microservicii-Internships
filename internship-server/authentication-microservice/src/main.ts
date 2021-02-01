import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { auth_host } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      host: auth_host,
      port: 3002
    }
  });

  await app.startAllMicroservicesAsync();

  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('Authentication Service')
    .setDescription('Authenticate Users - Local, JWT, Google')
    .setVersion('1.0')
    .addTag('authentication')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3001);
}
bootstrap();