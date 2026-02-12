import { IsEmail, IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { UserRole } from '@prisma/client'
export class RegisterUserDTO {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsEmail()
    email:string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;
    
    @IsEnum(UserRole, { message: 'Роль должна быть либо ADMIN, либо USER' })
  @IsOptional() 
  role?: UserRole; // Одиночное значение
}