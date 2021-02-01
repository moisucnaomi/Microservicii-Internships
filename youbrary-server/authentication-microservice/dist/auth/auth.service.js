"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("../config");
const user_dto_1 = require("./dto/user.dto");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.userClient = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.TCP,
            options: {
                host: config_1.user_host,
                port: 3005
            }
        });
    }
    async validateUser(email, password) {
        return await this.userClient.send('getUserByEmail', email).subscribe(async (existingUser) => {
            if (existingUser && existingUser.password === password) {
                const { password } = existingUser, result = __rest(existingUser, ["password"]);
                return result;
            }
            return null;
        });
    }
    async createToken(userEmail, provider) {
        const payload = { email: userEmail, provider: provider };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async register(userDto) {
        this.userClient.send('getUserByEmail', userDto.email).subscribe(async (existingUser) => {
            if (existingUser)
                throw new common_1.HttpException('A user with this email already exists', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            this.userClient.send('saveUser', userDto).subscribe();
        });
    }
    async addGoogleUser(userEmail) {
        this.userClient.send('getUserByEmail', userEmail).subscribe(async (existingUser) => {
            if (!existingUser) {
                let user = new user_dto_1.UserDto();
                user.email = userEmail;
                this.userClient.send('saveUser', user).subscribe();
            }
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map