"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = exports.googleConstants = exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: 'secretKey'
};
exports.googleConstants = {
    clientID: '892044754746-66v6vcnfugrdi69gnpr219l37c36ps09.apps.googleusercontent.com',
    clientSecret: 'url0AJTz5n8wk1euEkZCJ-c7',
    callbackURL: 'http://localhost:3001/auth/google/callback'
};
var Provider;
(function (Provider) {
    Provider["GOOGLE"] = "google";
    Provider["LOCAL"] = "local";
})(Provider = exports.Provider || (exports.Provider = {}));
//# sourceMappingURL=constants.js.map