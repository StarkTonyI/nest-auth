import { Module } from "@nestjs/common";
import { PrismaMoodule } from "src/database/database.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/JWT/jwt.strategy";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtRefresh } from "./strategy/JWT/jwt-refresh.strategy";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuth } from "./guard/jwt_auth";
import { PostModule } from "src/post/post.module";

@Module({
    providers:[AuthService, JwtStrategy, UserService, JwtRefresh, {
  provide: APP_GUARD,
  useClass: JwtAuth,
} ],
    imports:[PrismaMoodule, 
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
    }),

   inject: [ConfigService],
 }), UserModule,  PostModule
    ],
    controllers:[AuthController]
})
export class AuthModule {};

