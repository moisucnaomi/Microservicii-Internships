import { Body, Controller, HttpException, Post, Request, UseGuards } from '@nestjs/common';
import { Http2ServerResponse } from 'http2';
import { UserDto } from 'src/user/user.dto';

import { AuthService } from './auth.service';
import { LocalGuard } from './local.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
           .catch((exception) => { return exception });
  }


  @Post('register')
  async register(@Body() userDto: UserDto) {
    return this.authService.register(userDto)
           .catch((exception) => { return exception });
  }
}