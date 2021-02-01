import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InternshipController } from './internship.controller';
import { InternshipService } from './internship.service';
import { InternshipSchema } from './schema/internship.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Internship', schema: InternshipSchema }])
  ],
  controllers: [InternshipController],
  providers: [InternshipService]
})
export class InternshipModule {}