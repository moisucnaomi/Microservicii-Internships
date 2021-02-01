export const jwtConstants = {
    secret: 'secretKey'
};

export const googleConstants = {
    clientID: '892044754746-66v6vcnfugrdi69gnpr219l37c36ps09.apps.googleusercontent.com',     
    clientSecret: 'url0AJTz5n8wk1euEkZCJ-c7',
    callbackURL: 'http://localhost:3001/auth/google/callback'
};

export enum Provider
{
    GOOGLE = 'google',
    LOCAL = 'local'
}