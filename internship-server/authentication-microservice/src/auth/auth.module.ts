import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { auth_host } from 'src/config';

@Module({
    imports: [
        ClientsModule.register([{
            name: 'AUTH_SERVICE', 
            transport: Transport.TCP, options: {
              host: auth_host,
              port: 3002
            }
        }]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '600s' }
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy]
})
export class AuthModule {}