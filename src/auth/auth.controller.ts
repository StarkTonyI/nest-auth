import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInUserDTO } from "./dto/signInUser";
import { AuthGuard } from "@nestjs/passport";
import { RolesQuard } from "./guard/roles.guard";
import { Roles } from "./decorator/roles.decorator";
import { RegisterUserDTO } from "./dto/registerUser";

@Controller('auth')

export class AuthController {
    constructor(private readonly auth: AuthService){};

    @Post('register')
    async register(@Body() user: RegisterUserDTO){
        const findUser = await this.auth.register(user)
        return findUser

    }



    @Post('login')
    async login(@Body() login: SignInUserDTO){
        const findUser = await this.auth.login(login);
        return findUser;
    }
    @Roles('ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesQuard)
    
    @Get('profile')
    profile(@Req() req){
        return req.user;
    }

}


