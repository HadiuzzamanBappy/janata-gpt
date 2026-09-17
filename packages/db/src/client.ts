import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index.js';

// Connection string
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/turbo-db';

// Disable prefetch as it is not supported for "Transaction" pool mode (useful for serverless setups)
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
