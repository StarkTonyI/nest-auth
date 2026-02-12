import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaMoodule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaMoodule, AuthModule, 
    ConfigModule.forRoot({
      isGlobal: true,          // делает env доступным везде без инъекции
      envFilePath: '.env',     // или ['.env.local', '.env'] для нескольких
    }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
