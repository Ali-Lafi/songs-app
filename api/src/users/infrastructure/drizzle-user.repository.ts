import { Inject } from "@nestjs/common";
import { User } from "../domain/users.entity";
import { UsersRepository } from "../domain/users.repository";
import { DATABASE_CONNECTION } from "../../database/database-connection";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from './schema'
import { eq } from "drizzle-orm";
export class DrizzleUserRepository extends UsersRepository{
    constructor(@Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>){super()}
    
    override async findByEmail(email: string): Promise<User> {
        const user =await this.database.select().from(schema.usersTable).where(eq(schema.usersTable.email,email)).limit(1);
        return user[0] ?? null;
    }

}