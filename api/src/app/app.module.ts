import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { SongsModule } from '../songs/songs.module';
import { AuthModule } from '../auth/auth.module';
import { OrpcModule } from '../orpc/orpc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    SongsModule,
    AuthModule,
    OrpcModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
