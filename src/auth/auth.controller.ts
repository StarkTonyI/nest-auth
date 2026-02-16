import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInUserDTO } from "./dto/signInUser";
import { AuthGuard } from "@nestjs/passport";
import { RolesQuard } from "./guard/roles.guard";
import { Roles } from "./decorator/roles.decorator";
import { RegisterUserDTO } from "./dto/registerUser";
import { AuthRefresh } from "./guard/jwt-auth.guard";
import { JwtAuth } from "./guard/jwt_auth";

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
    

    @UseGuards(AuthRefresh)
    @Get('refresh')
    async refresh(@Req() req){
        if(!req.user.userId) throw new UnauthorizedException;
        return await this.auth.refreshTokens(req.user.userId)
    }

    @Get('profile')
    profile(@Req() req){
        //this.auth.refreshTokens(req)
        
    }
    @UseGuards(JwtAuth)
    @Post('logout')
    async logout(@Req() req){
         if(!req.user.userId) throw new UnauthorizedException;
        return await this.auth.logout(req.user.userId)
    }

}


