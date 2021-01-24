import { Injectable } from '@nestjs/common';
import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { User } from './user';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectInMemoryDBService('user') private readonly database: InMemoryDBService<User>) {}

  getAllUsers(): User[] {
    return this.database.getAll();
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const users = this.database.query(user => user.email === email);
    return users.length > 0 ? users[0] : undefined;
  }

  addUser(user: User): User {
    return this.database.create(user);
  }

  updateUser(user: User): User {
    this.database.update(user);
    return user;
  }

  async deleteUser(email: string) {
    const user = await this.getUserByEmail(email);

    if(user)
      this.database.delete(user.id);
  }

  dtoToUser(userDto: UserDto) {
    let user = new User();
    user.email = userDto.email;
    user.password = userDto.password;

    return user;
  }
}
