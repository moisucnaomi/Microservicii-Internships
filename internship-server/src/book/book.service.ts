import { Injectable } from '@nestjs/common';
import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';

import { Book } from './book';

@Injectable()
export class BookService {
  constructor(@InjectInMemoryDBService('book') private readonly database: InMemoryDBService<Book>) {}

  getAllBooks(): Book[] {
    return this.database.getAll();
  }

  getBookByID(bookID: string): Book {
    return this.database.get(bookID);
  }

  addBook(book: Book): Book {
    return this.database.create(book);
  }

  updateBook(book: Book): Book {
    this.database.update(book);
    return book;
  }

  deleteBook(bookID: string) {
    this.database.delete(bookID);
  }

  isDatabaseEmpty() {
    const books = this.database.getAll();
    return books.length === 0;
  }
}
