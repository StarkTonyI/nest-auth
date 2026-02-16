import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export class AuthRefresh extends AuthGuard('jwt-refresh'){
    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
        if(err) throw err;
        if(info?.name == 'TokenExpiredError') throw new UnauthorizedException({ message: 'Token expired', error: 'expired' })
        if(!user) throw new UnauthorizedException;
        return user;
    }
}