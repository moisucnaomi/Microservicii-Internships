import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
export declare class AuthController {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    login(req: any): Promise<any>;
    register(userDto: UserDto): Promise<any>;
    googleLogin(): void;
    googleLoginCallback(req: any, res: any): void;
}
