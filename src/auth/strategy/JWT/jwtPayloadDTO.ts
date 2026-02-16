import { UserRole } from "@prisma/client";
import { IsEmail, IsString } from "class-validator";

export class JWTPayload {
    @IsString()
    id:string
    @IsEmail()
    email:string
    @IsString()
    role?: UserRole
}