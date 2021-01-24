import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpErrorStatus } from 'src/core/core.models';
import { UserDto } from 'src/user/user.dto';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, 
              private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: UserDto) {
    let existingUser = await this.userService.getUserByEmail(userDto.email);

    if(existingUser)
      throw new HttpException('A user with this email already exists', HttpErrorStatus.UserAlreadyExists);

    this.userService.addUser(this.userService.dtoToUser(userDto));
  }
}