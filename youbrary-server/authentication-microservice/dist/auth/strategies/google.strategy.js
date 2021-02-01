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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const auth_service_1 = require("../auth.service");
const constants_1 = require("../constants");
let GoogleStrategy = class GoogleStrategy extends passport_1.PassportStrategy(passport_google_oauth20_1.Strategy, 'google') {
    constructor(authService) {
        super({
            clientID: constants_1.googleConstants.clientID,
            clientSecret: constants_1.googleConstants.clientSecret,
            callbackURL: constants_1.googleConstants.callbackURL,
            passReqToCallback: true,
            scope: ['profile', 'email']
        });
        this.authService = authService;
    }
    async validate(request, accessToken, refreshToken, profile) {
        const userEmail = profile.emails[0].value;
        return {
            userEmail: userEmail,
            access_token: await (await this.authService.createToken(userEmail, constants_1.Provider.GOOGLE)).access_token,
        };
    }
};
GoogleStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], GoogleStrategy);
exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=google.strategy.js.map