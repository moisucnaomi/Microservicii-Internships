import { IsString } from 'class-validator';
import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class User implements InMemoryDBEntity {
  @IsString() id: string;
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsString() email: string;
  @IsString() password: string;
  @IsString() roleId: string;
  @IsString() company: string;
}
