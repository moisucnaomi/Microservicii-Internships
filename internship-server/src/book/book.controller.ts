import { Body, Controller, Delete, Get, GoneException, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";

import { JwtGuard } from "src/auth/jwt.guard";
import { Book } from "./book";
import { BookService } from "./book.service";

@UseGuards(JwtGuard)
@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    async getAllBooks(): Promise<Book[]> {
        return this.bookService.getAllBooks();
    }

    @Get(':id')
    async getByID(@Param('bookID') bookID: string): Promise<Book> {
        const book = this.bookService.getBookByID(bookID);

        if (!book) 
            throw new NotFoundException("Book not found");   
                
        return book;
    }

    @Post()
    async addBook(@Body() book: Book): Promise<Book> {
        return this.bookService.addBook(book);
    }

    @Put(':bookID')
    async update(@Body() book: Book): Promise<Book> {
        const databaseBook = this.bookService.getBookByID(book.id);

        if (!databaseBook) {
            throw new GoneException();
        }

        return this.bookService.updateBook(book);
    }

    @Delete(':bookID')
    async deleteBook(@Param('bookID') bookID: string): Promise<void> {
        const book = this.bookService.getBookByID(bookID);

        if (!book) {
            throw new GoneException();
        }
        
        this.bookService.deleteBook(bookID);
    }
}