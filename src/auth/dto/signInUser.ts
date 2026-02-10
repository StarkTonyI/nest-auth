
import { RegisterUserDTO } from "./registerUser";
import { PartialType } from "@nestjs/mapped-types";

export class SignInUserDTO extends PartialType(RegisterUserDTO) {}