import { PrismaMoodule } from "src/database/database.module";
import { createUserDTO } from "./dto/createUser";
import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/database.service";

@Injectable()
export class UsersService  {
constructor(private readonly prisma: PrismaService){ }
    async create(createUser: createUserDTO){
        try{
            await this.prisma.user.create({ data:createUser })
            return { "User created": createUser.email}
        }catch(e){
             throw new ConflictException('Этот email занят')

        }
    }
   async findAll(){
       return await this.prisma.user.findMany({}) 
    }
}