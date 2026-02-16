import { SetMetadata } from '@nestjs/common';

// Мы просто создаем константу-ключ, чтобы не ошибиться в буквах
export const IS_PUBLIC_KEY = 'isPublic';

// Декоратор, который просто ставит метку true
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);