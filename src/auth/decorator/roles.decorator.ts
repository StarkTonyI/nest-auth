import { SetMetadata } from '@nestjs/common';

// Мы создаем функцию Roles, которая записывает данные под ключом 'roles'
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);


