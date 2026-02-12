import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'; // Добавили Injectable
import { Reflector } from '@nestjs/core';

@Injectable() // <--- БЕЗ ЭТОГО КЛАСС НЕ ВИДИТ REFLECTOR
export class RolesQuard  implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // Используем getAllAndOverride, чтобы можно было вешать роли и на контроллер, и на метод
        const reqRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!reqRoles) return true;

        const req = context.switchToHttp().getRequest();
        const user = req.user;

        console.log(user)
        console.log(reqRoles)

        console.log(reqRoles.includes(user.role))
        // Важный момент: если JWT Guard не сработал или не стоит перед этим, user будет undefined
        if (!user || !user.role) return false;

        return reqRoles.includes(user.role);
    }
}