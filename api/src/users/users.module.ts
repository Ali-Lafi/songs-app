import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersRepository } from './domain/users.repository';
import { DrizzleUserRepository } from './infrastructure/drizzle-user.repository';

@Module({
    imports:[DatabaseModule],
    providers:[{
        provide:UsersRepository,
        useClass:DrizzleUserRepository
    }],
    exports:[UsersRepository]
})
export class UsersModule {}
