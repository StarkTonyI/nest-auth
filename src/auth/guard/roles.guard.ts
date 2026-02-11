import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export class RolesQuard implements CanActivate {
    constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean {
        const reqRole = this.reflector.get('roles', context.getHandler());
        if(!reqRole) return true;
        const req = context.switchToHttp().getRequest();
        const user = req.user;

        return reqRole.includes(user.role)

    }
}
