import { JwtService } from '@nestjs/jwt';
import { Provider } from './constants';
import { UserDto } from './dto/user.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly userClient;
    constructor(jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    createToken(userEmail: string, provider: Provider): Promise<{
        access_token: string;
    }>;
    register(userDto: UserDto): Promise<void>;
    addGoogleUser(userEmail: string): Promise<void>;
}
