import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookModule } from './book/book.module';
import { db_host, db_name } from './config';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${db_host}/${db_name}`),
    BookModule
  ]
})
export class AppModule {}