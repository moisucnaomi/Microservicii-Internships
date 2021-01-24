import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionsFilter } from './httpExceptions.intercepor';
import { LoggingInterceptor } from './logging.interceptor';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: HttpExceptionsFilter }
  ]
})
export class CoreModule {}