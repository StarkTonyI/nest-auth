import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable() // Не забывай, гварды — это тоже провайдеры!
export class JwtAuth extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) { super() }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Проверяем наличие метки @Public()
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // 2. Если не публично, вызываем стандартную логику Passport
    // Нам нужен await, так как проверка токена — процесс асинхронный
    return (await super.canActivate(context)) as boolean;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      if (info?.name === 'TokenExpiredError') {
         throw new UnauthorizedException({ message: 'Token expired', error: 'expired' });
      }
      throw new UnauthorizedException();
    }
    return user;
  }
}