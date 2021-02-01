import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService } from "../auth.service";
import { googleConstants, Provider } from "../constants";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{
    constructor(private authService: AuthService)
    {
        super({
            clientID: googleConstants.clientID,    
            clientSecret: googleConstants.clientSecret,
            callbackURL: googleConstants.callbackURL,
            passReqToCallback: true,
            scope: ['profile', 'email']
        })
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile: any)
    {
        const userEmail = profile.emails[0].value;

        return {
            userEmail: userEmail,
            access_token: await (await this.authService.createToken(userEmail, Provider.GOOGLE)).access_token,
        }
    }
}