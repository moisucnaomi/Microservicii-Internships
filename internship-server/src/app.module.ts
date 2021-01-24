import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    InMemoryDBModule.forRoot(),
    BookModule,
    CoreModule,
    AuthModule,
    UserModule
  ]
})
export class AppModule {}