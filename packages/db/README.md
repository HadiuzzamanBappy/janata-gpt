# `@repo/db` - Database & ORM

A highly modular, type-safe database package built with **Drizzle ORM** and **PostgreSQL**. This package is pre-configured with a complete Role-Based Access Control (RBAC) schema.

## 🚀 Features

- **Drizzle ORM**: The fastest, most type-safe ORM for TypeScript.
- **Modular Schema**: Tables are split into isolated files inside `src/schema/` (no massive `schema.ts`).
- **Postgres.js**: Ultra-fast Postgres driver configured for serverless and standard connections.
- **RBAC Built-in**: `users`, `roles`, `permissions`, and their many-to-many junction tables are pre-configured.

## 🛠️ Setup

Before using the package, ensure your `.env` file at the root of the monorepo contains your database string:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/turbo-db"
```

### Useful Commands

Run these inside `packages/db`:
- `pnpm db:generate` - Creates SQL migration files based on schema changes.
- `pnpm db:push` - Pushes schema changes directly to the database (good for rapid prototyping).
- `pnpm db:studio` - Opens a local UI to view and edit your database records.

---

## 📖 Usage Manual

### 1. Basic Queries
Always import the `db` instance and the schemas directly from `@repo/db`.

```typescript
import { db, users } from '@repo/db';
import { eq } from 'drizzle-orm';

export async function getUser(email: string) {
  // Traditional SQL-like query
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
    
  return user[0];
}
```

### 2. Relational Queries (The Magic)
Because we configured `relations` in the schemas, you can do massive joins automatically using Drizzle's Relational API!

```typescript
import { db } from '@repo/db';

export async function getUserWithRolesAndPermissions(userId: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
    with: {
      roles: {
        with: {
          role: {
            with: {
              permissions: {
                with: {
                  permission: true
                }
              }
            }
          }
        }
      }
    }
  });

  return user;
}
```

### 3. Adding New Tables
1. Create a new file like `src/schema/posts.ts`.
2. Define your table and relations.
3. Export them in `src/schema/index.ts`.
4. Run `pnpm db:generate` to create the migration.
