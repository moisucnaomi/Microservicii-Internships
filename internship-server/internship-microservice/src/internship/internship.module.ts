import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/constants';

import { InternshipController } from './internship.controller';
import { InternshipService } from './internship.service';
import { InternshipSchema } from './schema/internship.schema';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Internship', schema: InternshipSchema }]),
    PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '600s' }
    }),
  ],
  controllers: [InternshipController],
  providers: [InternshipService, JwtStrategy]
})
export class InternshipModule {}