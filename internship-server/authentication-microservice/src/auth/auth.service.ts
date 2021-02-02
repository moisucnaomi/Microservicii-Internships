import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { user_host } from 'src/config';

import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  private readonly userClient = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: {
        host: user_host,
        port: 3005
    }
  });

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    return this.userClient.send('getUserByEmail', email).subscribe(async (existingUser) => {

      if (existingUser && existingUser.password === password) {
        const { password, ...result } = existingUser;
        return result;
      }

      return null;
    });
  }

  async createToken(userEmail: string) {
    const payload = { email: userEmail };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: UserDto) {
    console.log(userDto);

    this.userClient.send('getUserByEmail', userDto.email).subscribe(async (existingUser) => {
      if(existingUser)
        throw new HttpException('This email is already in use!', HttpStatus.INTERNAL_SERVER_ERROR);

      this.userClient.send('saveUser', userDto).subscribe(async (savedUser) => {
        console.log("User registered!")
      });
    });
  }

  async getUserDetails(userEmail: string) {
    return this.userClient.send('getUserByEmail', userEmail).toPromise().then((existingUser) => {
      return existingUser;
    });
  }
}