import { createUserDTO } from "./createUser";
import { PartialType } from '@nestjs/mapped-types';
export class UpdateUserDTO extends PartialType(createUserDTO) {}