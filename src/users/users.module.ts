import { Module } from "@nestjs/common";
import { PrismaMoodule } from "src/database/database.module";
import { UsersService } from "./users.service";
import { UserController } from "./users.controller";

@Module({
    imports:[PrismaMoodule],
    providers:[UsersService],
    controllers:[UserController]
})
export class UsersModule {};