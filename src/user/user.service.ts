import { Injectable } from "@nestjs/common";
import { RegisterUserDTO } from "src/auth/dto/registerUser";
import { PrismaService } from "src/database/database.service";
@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async create(data: RegisterUserDTO) {
        return this.prisma.user.create({ data });
    }
}



