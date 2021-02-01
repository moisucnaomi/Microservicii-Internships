import { Body, Controller, Delete, Get, GoneException, Logger, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

import { v4 as uuidv4 } from 'uuid';

import { Book } from "./book";
import { BookService } from "./book.service";

@Controller('books')
@ApiTags('auth')
export class BookController {
    private readonly logger = new Logger("Book Controller");

    constructor(private readonly bookService: BookService) {}

    @MessagePattern('getAllBooksByEmail')
    @Get(':email')
    async getAllBooksByUserEmail(@Param('email') email: string): Promise<Book[]> {
        this.logger.log("getAllBooksByUserEmail method called - email: " + email);

        const books = await this.bookService.getAllBooksByUserEmail(email);

        this.logger.log("Result: " + books);

        return books;
    }

    @MessagePattern('getBookByID')
    @Get('/bookID/:bookID')
    async getByID(@Param('bookID') bookID: string): Promise<Book> {
        this.logger.log("getByID method called - bookID: " + bookID);

        const book = this.bookService.getBookByID(bookID);

        if (!book) { 
            this.logger.log("Book not found!");
            throw new NotFoundException("Book not found");   
        }
                
        this.logger.log("Result: " + book);

        return book;
    }

    @MessagePattern('addBook')
    @Post()
    async addBook(@Body() book: Book): Promise<Book> {
        this.logger.log("addBook method called - book: " + book);

        if(!book.id)
            book.id = uuidv4();
            
        const savedBook = await this.bookService.saveBook(book);

        this.logger.log("Book saved");

        return savedBook;
    }

    @MessagePattern('updateBook')
    @Put()
    async update(@Body() book: Book): Promise<Book> {
        this.logger.log("update method called - book: " + book);

        const databaseBook = this.bookService.getBookByID(book.id);

        if (!databaseBook) {
            this.logger.log("Book not found!");
            throw new GoneException();
        }

        const updatedBook = await this.bookService.saveBook(book);

        this.logger.log("Book updated");

        return updatedBook;
    }

    @EventPattern('deleteBook')
    @Delete(':bookID')
    async deleteBook(@Param('bookID') bookID: string): Promise<void> {
        this.logger.log("deleteBook method called - bookID: " + bookID);

        const book = this.bookService.getBookByID(bookID);

        if (!book) {
            this.logger.log("Book not found!");
            throw new GoneException();
        }
        
        await this.bookService.deleteBook(bookID);

        this.logger.log("Book deleted!");
    }
}