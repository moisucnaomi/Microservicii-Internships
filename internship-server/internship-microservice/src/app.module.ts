import { Module } from 'src/internship/node_modules/@nestjs/common';
import { MongooseModule } from 'src/internship/node_modules/@nestjs/mongoose';

import { InternshipModule } from './internship/internship.module';
import { db_host, db_name } from './config';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${db_host}/${db_name}`),
    InternshipModule
  ]
})
export class AppModule {}