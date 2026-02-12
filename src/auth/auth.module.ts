import { Module } from "@nestjs/common";
import { PrismaMoodule } from "src/database/database.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";

@Module({
    providers:[AuthService, JwtStrategy, UserService],
    imports:[PrismaMoodule, 
    JwtModule.register({
        secret: process.env.SUPER_SECRET_KEY || 'asfoijoaisjfoiasjfoiaoisjjfoiasijf', // знаю знаю что нужно в env!
        signOptions: { expiresIn: '60m' },
        }), UserModule
    ],
    controllers:[AuthController]
})
export class AuthModule {};