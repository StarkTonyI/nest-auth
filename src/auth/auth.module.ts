import { Module } from "@nestjs/common";
import { PrismaMoodule } from "src/database/database.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    providers:[AuthService, JwtStrategy],
    imports:[PrismaMoodule, 
    JwtModule.register({
        secret: process.env.SUPER_SECRET_KEY, // знаю знаю что нужно в env!
        signOptions: { expiresIn: '60m' },
        })
    ],
    controllers:[AuthController]
})
export class AuthClass {};