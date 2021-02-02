import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InternshipModule } from './internship/internship.module';
import { db_host, db_name } from './config';


@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${db_host}/${db_name}`),
    InternshipModule
  ]
})
export class AppModule {}