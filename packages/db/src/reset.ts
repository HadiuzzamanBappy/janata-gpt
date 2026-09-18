/**
 * Database, Storage & Edge Functions Reset Script
 *
 * - Drops ALL tables in the public schema dynamically
 * - Empties, then DELETES all Supabase Storage buckets
 * - DELETES all Supabase Edge Functions (requires SUPABASE_ACCESS_TOKEN)
 * - Re-runs all migrations from scratch
 *
 * Required .env vars:
 *   DATABASE_URL              — Postgres connection string
 *   NEXT_PUBLIC_SUPABASE_URL  — e.g. https://<ref>.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY — For DB + Storage access
 *   SUPABASE_ACCESS_TOKEN     — Personal Access Token from:
 *                               https://app.supabase.com/account/tokens
 *                               (needed for Edge Function management)
 *
 * Usage: pnpm run db:reset
 */
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '../../.env') });

import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import { createClient } from '@supabase/supabase-js';

const DATABASE_URL = process.env.DATABASE_URL!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN; // Optional — needed for Edge Functions

if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');
if (!SUPABASE_URL) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
if (!SERVICE_ROLE_KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');

// Extract project ref from URL: https://<ref>.supabase.co
const PROJECT_REF = new URL(SUPABASE_URL).hostname.split('.')[0];

const sql = postgres(DATABASE_URL, { max: 1 });
const db = drizzle(sql);
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ─────────────────────────────────────────────────────────────────────────────
// 1. Drop ALL tables in the public schema dynamically
// ─────────────────────────────────────────────────────────────────────────────
async function dropAllTables() {
  console.log('🗑️  Dropping all tables in public schema...');

  const tables = await sql<{ tablename: string }[]>`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  `;

  if (tables.length === 0) {
    console.log('   No tables found — already clean.\n');
    return;
  }

  const tableList = tables.map((t) => `"public"."${t.tablename}"`).join(', ');
  await sql.unsafe(`DROP TABLE IF EXISTS ${tableList} CASCADE`);
  console.log(`   ✅ Dropped ${tables.length} tables\n`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Drop Drizzle migration tracking schema
// ─────────────────────────────────────────────────────────────────────────────
async function dropMigrationHistory() {
  await sql`DROP TABLE IF EXISTS "drizzle"."__drizzle_migrations" CASCADE`;
  await sql`DROP SCHEMA IF EXISTS "drizzle" CASCADE`;
  console.log('✅ Cleared Drizzle migration history\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Empty AND DELETE all Supabase Storage buckets
// ─────────────────────────────────────────────────────────────────────────────
async function resetStorage() {
  console.log('🪣  Resetting Supabase Storage...');

  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  if (bucketsError) {
    console.warn(`   ⚠️  Could not list buckets: ${bucketsError.message}\n`);
    return;
  }
  if (!buckets || buckets.length === 0) {
    console.log('   No storage buckets found — skipping.\n');
    return;
  }
  for (const bucket of buckets) {
    // Empty the bucket first
    const { error: emptyError } = await supabase.storage.emptyBucket(bucket.name);
    if (emptyError) {
      console.warn(`   ⚠️  Could not empty bucket '${bucket.name}': ${emptyError.message}`);
      continue;
    }
    console.log(`   ✅ Emptied bucket '${bucket.name}'`);

    // Give Supabase a second to sync the deletions before trying to drop the bucket
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Delete the bucket itself
    const { error: deleteError } = await supabase.storage.deleteBucket(bucket.name);
    if (deleteError) {
      console.warn(`   ⚠️  Could not delete bucket '${bucket.name}': ${deleteError.message}`);
    } else {
      console.log(`   ✅ Deleted bucket '${bucket.name}'`);
    }
  }
  console.log();
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Delete all Supabase Edge Functions via Management API
// ─────────────────────────────────────────────────────────────────────────────
async function deleteEdgeFunctions() {
  console.log('⚡ Deleting Supabase Edge Functions...');

  if (!ACCESS_TOKEN) {
    console.warn('   ⚠️  SUPABASE_ACCESS_TOKEN not set — skipping Edge Functions.\n');
    console.warn('   Add it to .env from: https://app.supabase.com/account/tokens\n');
    return;
  }

  const headers = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };
  const baseUrl = `https://api.supabase.com/v1/projects/${PROJECT_REF}/functions`;

  // List all functions
  const listRes = await fetch(baseUrl, { headers });
  if (!listRes.ok) {
    console.warn(`   ⚠️  Could not list Edge Functions: ${listRes.statusText}\n`);
    return;
  }

  const functions = (await listRes.json()) as { slug: string; name: string }[];

  if (!functions || functions.length === 0) {
    console.log('   No Edge Functions found — skipping.\n');
    return;
  }

  for (const fn of functions) {
    const deleteRes = await fetch(`${baseUrl}/${fn.slug}`, {
      method: 'DELETE',
      headers,
    });
    if (deleteRes.ok) {
      console.log(`   ✅ Deleted Edge Function '${fn.slug}'`);
    } else {
      console.warn(`   ⚠️  Could not delete '${fn.slug}': ${deleteRes.statusText}`);
    }
  }
  console.log();
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`⚠️  Full reset for project: ${PROJECT_REF}\n`);

  await dropAllTables();
  await dropMigrationHistory();
  await resetStorage();
  await deleteEdgeFunctions();

  console.log('🚀 Applying all migrations from scratch...\n');
  await migrate(db, { migrationsFolder: './migrations' });

  console.log('🎉 Reset complete — DB, Storage & Edge Functions are clean!\n');
  await sql.end();
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Reset failed:', err?.message ?? err);
  process.exit(1);
});
