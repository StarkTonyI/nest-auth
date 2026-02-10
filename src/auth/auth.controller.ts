import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInUserDTO } from "./dto/signInUser";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')

export class AuthController {
    constructor(private readonly auth: AuthService){};

    @Post('login')
    async login(@Body() login: SignInUserDTO){
        const findUser = await this.auth.login(login);
        return findUser;
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    profile(@Req() req){
        return req.user;
    }

}