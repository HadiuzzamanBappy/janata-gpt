import { pgTable, text, timestamp, boolean, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ----------------------------------------------------------------------
// Users
// NOTE: RLS policies are managed directly in Supabase Dashboard or via
// SQL migrations — not through drizzle-kit push (pgPolicy causes a known
// drizzle-kit bug when introspecting Supabase tables).
// ----------------------------------------------------------------------
export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// ----------------------------------------------------------------------
// Roles & Permissions
// ----------------------------------------------------------------------
export const roles = pgTable('roles', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const permissions = pgTable('permissions', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  action: text('action').notNull(),
  resource: text('resource').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// ----------------------------------------------------------------------
// Junctions (Many-to-Many)
// ----------------------------------------------------------------------
export const userRoles = pgTable('user_roles', {
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  roleId: text('role_id').notNull().references(() => roles.id, { onDelete: 'cascade' }),
  assignedAt: timestamp('assigned_at', { mode: 'date' }).defaultNow().notNull(),
}, (t) => [
  primaryKey({ columns: [t.userId, t.roleId] })
]);

export const rolePermissions = pgTable('role_permissions', {
  roleId: text('role_id').notNull().references(() => roles.id, { onDelete: 'cascade' }),
  permissionId: text('permission_id').notNull().references(() => permissions.id, { onDelete: 'cascade' }),
  grantedAt: timestamp('granted_at', { mode: 'date' }).defaultNow().notNull(),
}, (t) => [
  primaryKey({ columns: [t.roleId, t.permissionId] })
]);

// ----------------------------------------------------------------------
// Relations
// ----------------------------------------------------------------------
export const usersRelations = relations(users, ({ many }) => ({
  roles: many(userRoles),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(userRoles),
  permissions: many(rolePermissions),
}));

export const permissionsRelations = relations(permissions, ({ many }) => ({
  roles: many(rolePermissions),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, { fields: [userRoles.userId], references: [users.id] }),
  role: one(roles, { fields: [userRoles.roleId], references: [roles.id] }),
}));

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
  role: one(roles, { fields: [rolePermissions.roleId], references: [roles.id] }),
  permission: one(permissions, { fields: [rolePermissions.permissionId], references: [permissions.id] }),
}));
