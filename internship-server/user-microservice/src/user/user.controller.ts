import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, EventPattern, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { auth_host } from 'src/config';
import { User } from './user';
import { UserDto } from './user.dto';

import { UserService } from './user.service';
  
@Controller('users')
export class UserController {
    private readonly logger = new Logger("User Controller");

    constructor(private readonly userService: UserService) { }

    @MessagePattern('getAllUsers')
    async getAllUsers(): Promise<User[]> {
        this.logger.log("getAllUsers method called");

        const users = await this.userService.getAllUsers();

        this.logger.log("Result: " + users);

        return users;
    }
    
    @MessagePattern('getUserByEmail')
    async getUserByEmail(email: string): Promise<User> {
        this.logger.log("getUserByEmail method called - email: " + email);

        const user = await this.userService.getUserByEmail(email);

        this.logger.log("Result: " + user);

        return user;
    }
    
    @MessagePattern('saveUser')
    async saveUser(user: UserDto): Promise<User> {
        this.logger.log("saveUser method called - user: " + user.email);

        const savedUser = this.userService.saveUser(user);

        this.logger.log("User Saved");

        return savedUser;
    }
}
