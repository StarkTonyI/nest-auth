import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export interface JwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
  roles?: string[];
  tokenVersion?: number;
  jti?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private readonly config: ConfigService
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow('JWT_SECRET'),
      ignoreExpiration: false,
      algorithms: ['HS256']
    });
  }
  async validate(payload: JwtPayload) {
      if(!payload || !payload.sub) throw new UnauthorizedException;
      return {
        userId:payload.sub,
        roles: payload.roles
      }
  }
}
