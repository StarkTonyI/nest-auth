// src/database/database.service.ts  (или prisma.service.ts)
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';  // ← отсюда, если используешь старый generator prisma-client-js
// или import { PrismaClient } from './generated/prisma/client';  ← если новый generator "prisma-client"

import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private config: ConfigService) {
    // 1. Берём строку подключения (можно из ConfigService)
    const connectionString = config.get<string>('DATABASE_URL');

    if (!connectionString) {
      throw new Error('DATABASE_URL is not defined in environment');
    }

    // 2. Создаём pool и adapter
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);   // schema: 'public' — если не public, то здесь

    // 3. Передаём ТОЛЬКО adapter (без datasources!)
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}