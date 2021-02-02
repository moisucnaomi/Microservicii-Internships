export const jwtConstants = {
    secret: 'secretKey'
};

export const googleConstants = {
    clientID: '537938309927-1oo401rk2mjqfm6tl3hph0s1p6mq7v8l.apps.googleusercontent.com',     
    clientSecret: 'Ab3_aGdSRuIIidsebGjitacF',
    callbackURL: 'http://localhost:3001/auth/google/callback'
};

export enum Provider
{
    GOOGLE = 'google',
    LOCAL = 'local'
}