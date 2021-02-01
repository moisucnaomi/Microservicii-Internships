import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { InternshipController } from './internship.controller';
import { InternshipService } from './internship.service';

@Module({
  imports: [InMemoryDBModule.forFeature('internship', {})],
  controllers: [InternshipController],
  providers: [InternshipService],
  exports: [InternshipService],
})
export class InternshipModule {}
