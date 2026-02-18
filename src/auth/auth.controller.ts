import { Body, Controller, Delete, Get, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInUserDTO } from "./dto/signInUser";
import { AuthGuard } from "@nestjs/passport";
import { RolesQuard } from "./guard/roles.guard";
import { Roles } from "./decorator/roles.decorator";
import { RegisterUserDTO } from "./dto/registerUser";
import { AuthRefresh } from "./guard/jwt-auth.guard";
import { JwtAuth } from "./guard/jwt_auth";
import { CurrentUser } from "./decorator/useParam.decorator";
import { Public } from "./decorator/public.decorator";
import { OwnershipGuard } from "./guard/post_check.guard";
import { CheckOwnership } from "./decorator/check-ownership.decorator";

@Controller('auth')

export class AuthController {
    constructor(private readonly auth: AuthService){};
    @Public()
    @Post('register')
    async register(@Body() user: RegisterUserDTO){
        const findUser = await this.auth.register(user)
        return findUser
    }
    @Public()
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
    @Get('gemini')
    async somehandler(@CurrentUser('userId') user){
        return true;
    }
    @CheckOwnership('post', 'id')
    @UseGuards(OwnershipGuard)
    @Delete('delete/:id') 
    async deletePost(){
        
    }
}



