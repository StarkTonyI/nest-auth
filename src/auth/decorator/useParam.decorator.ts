import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface LocalJwtPayload {
  userId: string;
  roles: string
}

export const CurrentUser = createParamDecorator(
  (data: keyof LocalJwtPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if(!request.user) return null;
    if(!data) return request.user;

    return request?.user[data];
  },
);
