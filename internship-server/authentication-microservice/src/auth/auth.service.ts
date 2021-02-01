import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { user_host } from 'src/config';

import { Provider } from './constants';
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
    return await this.userClient.send('getUserByEmail', email).subscribe(async (existingUser) => {

      if (existingUser && existingUser.password === password) {
        const { password, ...result } = existingUser;
        return result;
      }

      return null;
    });
  }

  async createToken(userEmail: string, provider: Provider) {
    const payload = { email: userEmail, provider: provider };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: UserDto) {
    console.log(userDto);

    this.userClient.send('getUserByEmail', userDto.email).subscribe(async (existingUser) => {
      console.log("aaaaaaaaaaaaaaaaaaaaa")
      console.log(existingUser)
      if(existingUser)
        throw new HttpException('A user with this email already exists', HttpStatus.INTERNAL_SERVER_ERROR);

      this.userClient.send('saveUser', userDto).subscribe(async (savedUser) => {
        console.log("saved!!!")
        console.log(savedUser.email)
      });
    });
  }

  async addGoogleUser(userEmail: string) {
    this.userClient.send('getUserByEmail', userEmail).subscribe(async (existingUser) => {
      if(!existingUser) {
        let user = new UserDto();
        user.email = userEmail;

        this.userClient.send('saveUser', user).subscribe();
      }
    });
  }
}