"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const config_1 = require("./config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            retryAttempts: 5,
            retryDelay: 3000,
            host: config_1.auth_host,
            port: 3002
        }
    });
    await app.startAllMicroservicesAsync();
    app.enableCors();
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Authentication Service')
        .setDescription('Authenticate Users - Local, JWT, Google')
        .setVersion('1.0')
        .addTag('authentication')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('doc', app, document);
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map