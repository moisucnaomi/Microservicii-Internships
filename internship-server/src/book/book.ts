import { IsBase64, IsInt, IsString } from 'class-validator';
import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class Book implements InMemoryDBEntity {
  @IsString() id: string;
  @IsString() title: string;
  @IsString() author: string;
  @IsString() description: string;
  @IsString() isbn: string;
  @IsString() publisher: string;
  @IsInt() numberOfPages: number;
  @IsBase64() coverImage: string;
}