import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

import { UserService } from './user.service';

@Module({
  imports: [
    InMemoryDBModule.forFeature('user', {}),
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}