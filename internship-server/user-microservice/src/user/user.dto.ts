import { IsString } from 'class-validator';
import { User } from './user';

export class UserDto {
  @IsString() email: string;
  @IsString() password: string;
}