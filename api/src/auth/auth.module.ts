import { Inject, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { LoginHandler } from './application/login.command';
import { JwtStrategy } from './infrastructure/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers:[AuthController],
  providers:[LoginHandler, JwtStrategy]
})
export class AuthModule {}
