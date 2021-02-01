import { IsString } from 'class-validator';
import { Document } from 'mongoose';

export class User extends Document {
  @IsString() id: string;
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsString() email: string;
  @IsString() password: string;
  @IsString() roleId: string;
  @IsString() company: string;
}