import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { InternshipModule } from './internship/internship.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    InMemoryDBModule.forRoot(),
    InternshipModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
