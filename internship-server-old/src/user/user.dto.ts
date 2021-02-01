import { IsDate, IsString } from 'class-validator';
import { User } from './user';

export class UserDto {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsString() email: string;
  @IsString() password: string;
  @IsString() roleId: string;
  @IsString() company: string;
}
