import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PrismaService } from "src/database/database.service";


@Injectable()

export class OwnershipGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private readonly prisma: PrismaService){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
    const [model, paramName] = this.reflector.get('entity', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const resourceId = request.params[paramName];

    // 1. Умная конвертация ID (число или строка)
    const id = isNaN(+resourceId) ? resourceId : +resourceId;

    // 2. Поиск записи
    const record = await (this.prisma[model] as any).findUnique({ 
        where: { id } 
    });

    // 3. Безопасная проверка: если записи нет или юзер не тот
    if (!record || record.userId !== request.user.id) {
        throw new ForbiddenException('Доступ запрещен или ресурс не найден');
    }

    return true; // Пропускаем!
}
}