import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt.strategy";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt'; 
@Injectable()
export class JwtRefresh extends PassportStrategy(Strategy, 'jwt-refresh'){
    constructor(config: ConfigService, private readonly userService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.getOrThrow('JWT_REFRESH_SECRET'),
            algorithms:['HS256'],
            ignoreExpiration:false,
            passReqToCallback:true
        })
    }
    async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('authorization')?.replace('Bearer ', '');
    if (!payload.sub || !refreshToken) {
        throw new UnauthorizedException;
    }
    
    const userExist = await this.userService.findById(payload.sub);

    if(!userExist || !userExist.refreshToken) throw new UnauthorizedException({ message:'User Not Found' });
    const isMathch = await bcrypt.compare(refreshToken, userExist.refreshToken);

    
    if(!isMathch) throw new UnauthorizedException;
    
    return {
        userId: payload.sub,
        token: refreshToken
    };
}
}