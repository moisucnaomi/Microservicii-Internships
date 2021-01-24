import { IsString } from 'class-validator';
import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class User implements InMemoryDBEntity {
  @IsString() id: string;
  @IsString() email: string;
  @IsString() password: string;
}