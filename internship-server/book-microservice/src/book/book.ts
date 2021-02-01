import { IsBase64, IsInt, IsString } from 'class-validator';
import { Document } from 'mongoose';

export class Book extends Document {
  @IsString() id: string;
  @IsString() title: string;
  @IsString() author: string;
  @IsString() description: string;
  @IsString() isbn: string;
  @IsString() publisher: string;
  @IsInt() numberOfPages: number;
  @IsBase64() coverImage: string;
}