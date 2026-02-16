import { UserRole } from "@prisma/client";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

export class SignInUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

      
  @IsEnum(UserRole, { message: 'Роль должна быть либо ADMIN, либо USER' })
  @IsOptional() 
  role?: UserRole; // Одиночное значение
}
