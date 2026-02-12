import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { PrismaMoodule } from "src/database/database.module";

@Module({
    providers:[UserService],
    imports:[PrismaMoodule],
    controllers:[]
})
export class UserModule {};


