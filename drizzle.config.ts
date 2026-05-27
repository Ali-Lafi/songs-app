import {defineConfig} from 'drizzle-kit'
/// <reference types="node" />

import 'dotenv/config';

export default defineConfig({
    schema:'./api/src/**/schema.ts',
    out:'./drizzle',
    dialect:'postgresql',
    dbCredentials:{
        url: process.env.DATABASE_URL!
    }
})