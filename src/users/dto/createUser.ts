import { IsEmail, IsString } from "class-validator";

export class createUserDTO {
    @IsString()
    name: string;
    @IsEmail()
    email: string;
}