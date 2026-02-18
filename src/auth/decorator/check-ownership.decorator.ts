import { SetMetadata } from '@nestjs/common';

export const CheckOwnership = (...entity: string[]) => SetMetadata('entity', entity);


