import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from '../users/infrastructure/schema'
import * as bcrypt from 'bcryptjs'
import 'dotenv/config'
import { eq } from "drizzle-orm";

async function main() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL
    })
    const db = drizzle(pool,{schema});
    const email = 'alilafi@test.com'
    const passwordHash = await bcrypt.hash('ADMIN',10)

    const existingUser = await db.select().from(schema.usersTable).where(eq(schema.usersTable.email, email)).limit(1);

    if(existingUser.length === 0){
    await db.insert(schema.usersTable).values({
        email:email ,
        passwordHash: passwordHash,
        role: 'admin'
    })
        console.log('Admin user seeded');

    }else{
            console.log('Admin user already exists');
    }
    
    await pool.end();
}

main().catch(error => console.error(error));