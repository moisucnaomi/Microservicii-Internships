import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { user_host } from './config';

const logger = new Logger('User Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: user_host,
      port: 3005,
    }
  });
  
  await app.listen(() => {
    logger.log('User microservice has started listening!')
  });
}

bootstrap();