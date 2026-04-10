import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// 1. Setup the PG Connection Pool
const pool = new pg.Pool({ 
    user: 'postgres',
    host: '127.0.0.1',
    database: 'job_tracker_saas', // Make sure this matches your Postgres DB name!
    password: 'kiran2002',       // Hardcode it here just to test
    port: 5432,
});

// 2. Setup the Prisma Adapter
const adapter = new PrismaPg(pool);

// 3. Export a single instance to use everywhere
export const prisma = new PrismaClient({ adapter });