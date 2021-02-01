import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id: String,
    email: String,
    password: String
});