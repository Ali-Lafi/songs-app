import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from '../users/infrastructure/schema'
import * as bcrypt from 'bcryptjs'
import 'dotenv/config'

async function main() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL
    })
    const db = drizzle(pool,{schema});
    const passwordHash = await bcrypt.hash('ADMIN',10)

    await db.insert(schema.usersTable).values({
        email: 'alilafi@test.com',
        passwordHash: passwordHash,
        role: 'admin'
    })
    await pool.end();
}

main().catch(error => console.error(error));