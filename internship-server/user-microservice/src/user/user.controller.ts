import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, EventPattern, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { auth_host } from 'src/config';
import { User } from './user';

import { UserService } from './user.service';
  
@Controller('users')
export class UserController {
    private readonly logger = new Logger("User Controller");

    constructor(private readonly userService: UserService) { }

    @MessagePattern('getAllUsers')
    async getAllUsers(): Promise<User[]> {
        this.logger.log("Internship - getAllUsers");

        const users = await this.userService.getAllUsers();

        this.logger.log("Internship - getAllUsers - result length: " + users.length);

        return users;
    }
    
    @MessagePattern('getUserByEmail')
    async getUserByEmail(email: string): Promise<User> {
        this.logger.log("Internship - getUserByEmail - email: " + email);

        return await this.userService.getUserByEmail(email);
    }
    
    @MessagePattern('saveUser')
    async saveUser(user: User): Promise<User> {
        this.logger.log("Internship - saveUser - email:  " + user.email);

        const savedUser = await this.userService.saveUser(user);

        this.logger.log("User Saved");

        return savedUser;
    }
}
