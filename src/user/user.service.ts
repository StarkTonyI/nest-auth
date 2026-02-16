import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RegisterUserDTO } from "src/auth/dto/registerUser";
import { PrismaService } from "src/database/database.service";
@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string){

        return this.prisma.user.findUniqueOrThrow({
            where:{
                id: id
            },
            omit:{password:true}

        })
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async create(data: RegisterUserDTO) {
        return this.prisma.user.create({ data });
    }

    async saveToken(data: string, id:string){
        if(!data) return null;
        await this.prisma.user.update({
            where:{
                id: id
            },
            data:{ refreshToken: data }
        })
    }

    async destroyToken(userId:string){
     await this.prisma.user.update({
            where:{
                id:userId
            },
            data:{
                refreshToken:null
            }
        })
    }
}




