import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { createUserDTO } from "./dto/createUser";

@Controller('users')
export class UserController {
    constructor(private readonly service:UsersService) {}

    @Post()
    create(@Body() data:createUserDTO){
        return this.service.create(data)
    }

    @Get()
    findAll(){
        return this.service.findAll()
    }
}