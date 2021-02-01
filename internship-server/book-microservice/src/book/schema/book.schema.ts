import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
    id: String,
    title: String,
    author: String,
    description: String,
    isbn: String,
    publisher: String,
    numberOfPages: Number,
    coverImage: String
});