import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/database.service";

@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService){}

    async findPost(id:string){
        const post = await this.prisma.post.findUnique({
            where:{
                id:id
            }
        })
        return post;
    }

    async deletePost(id:string){
        return await this.prisma.post.delete({
            where:{
                id:id
            }
        })
    }


}