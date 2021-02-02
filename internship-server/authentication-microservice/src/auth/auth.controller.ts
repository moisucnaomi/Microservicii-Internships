import { Body, Controller, Get, Logger, Param, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { UserDto } from './dto/user.dto';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger("Auth Controller");

  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req) {
    this.logger.log("Internships - login");

    return await this.authService.createToken(req.user.email);
  }

  @Post('register')
  @ApiBody({type: [UserDto]})
  async register(@Body() userDto: UserDto) {
    this.logger.log("Internships - register");

    return await this.authService.register(userDto);
  }

  @Get('user/:email')
  async getUserDetails(@Param('email') userEmail: string) {
    this.logger.log("Internships - getUserDetails - userEmail: " + userEmail);

    return await this.authService.getUserDetails(userEmail);
  }
}