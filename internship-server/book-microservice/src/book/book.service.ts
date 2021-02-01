import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Book } from './book';

@Injectable()
export class BookService {
  private readonly logger = new Logger('Book Service');

  constructor(@InjectModel('Book') private readonly model: Model<Book>) {}

  async getAllBooksByUserEmail(email: string): Promise<Book[]> {
    return await this.model.find(book => book.userEmail === email);
  }

  async getBookByID(bookID: string): Promise<Book> {
    return await this.model.findById(bookID);
  }

  async saveBook(book: Book): Promise<Book> {
    const bookModel = new this.model(book);
    return await bookModel.save();
  }

  async deleteBook(bookID: string) {
    const book = await this.getBookByID(bookID);

    if(book)
      await this.model.deleteOne(bookID);
  }
}