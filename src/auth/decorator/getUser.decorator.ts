import { ExecutionContext } from "@nestjs/common";

export class DecoratorTs  {
    constructor(private readonly context: ExecutionContext){
        const handler = context.getHandler(); // Получить метод
        const controller = context.getClass(); // Получить класс
        const type = context.getType(); // 'http'
        console.log()
    }
}