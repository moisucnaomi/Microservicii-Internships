import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [InMemoryDBModule.forFeature('book', {})],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService]
})
export class BookModule {}