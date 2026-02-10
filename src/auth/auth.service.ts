import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/database/database.service";
import { SignInUserDTO } from "./dto/signInUser";
import { UnauthorizedException } from "@nestjs/common";

export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService){}

    async login(login: SignInUserDTO){
        const user = await this.prisma.user.findUnique({
            where: {
                email: login.email
            }
        })
        if(!user) throw new UnauthorizedException;
        const payload = { sub: user.id, email: user.email };

     return { access_token: await this.jwt.signAsync(payload) };

    }

}