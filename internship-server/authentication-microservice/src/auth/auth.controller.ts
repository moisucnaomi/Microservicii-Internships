import { Body, Controller, Get, Logger, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Provider } from './constants';
import { UserDto } from './dto/user.dto';
import { GoogleGuard } from './guards/google.guard';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger("Auth Controller");

  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req) {
    this.logger.log("login method called");

    return this.authService.createToken(req.user.email, Provider.LOCAL)
           .catch((exception) => { 
             return exception });
  }

  @Post('register')
  @ApiBody({type: [UserDto]})
  async register(@Body() userDto: UserDto) {
    console.log("********************************")
    console.log(userDto);
    console.log("********************************")

    this.logger.log("register method called");

    return this.authService.register(userDto)
           .catch((exception) => { return exception });
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  googleLogin(){
    this.logger.log("google login method called");
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  googleLoginCallback(@Req() req, @Res() res)
  {
    this.logger.log("google login callback method called");
    
    const token: string = req.user.access_token;
    const userEmail = req.user.userEmail;

    if (token)
    {
      this.authService.addGoogleUser(userEmail);
      res.redirect('http://localhost:4200/login/google/success?token=' + token + '&email=' + userEmail);
    }
    else 
        res.redirect('http://localhost:4200/login/google/failure');
  }
}