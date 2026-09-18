import { db } from './client.js';
import { users, roles, userRoles, chats, messages, documents, documentChunks } from './schema/index.js';

async function main() {
  console.log('🌱 Starting database seed...\n');

  try {
    // 1. Create Admin Role
    const [adminRole] = await db.insert(roles).values({
      name: 'Admin',
      description: 'Superuser with full system access',
    }).returning();
    console.log(`✅ Created Admin Role (${adminRole!.id})`);

    // 2. Create Mock User
    const [mockUser] = await db.insert(users).values({
      name: 'Alice Developer',
      email: 'alice@example.com',
      image: 'https://avatars.githubusercontent.com/u/1024025',
    }).returning();
    console.log(`✅ Created Mock User (${mockUser!.email})`);

    // 3. Assign Admin Role to User
    await db.insert(userRoles).values({
      userId: mockUser!.id,
      roleId: adminRole!.id,
    });
    console.log(`✅ Assigned Admin Role to Alice`);

    // 4. Create a Mock Chat
    const [mockChat] = await db.insert(chats).values({
      title: 'Monorepo Architecture Discussion',
      userId: mockUser!.id,
    }).returning();
    console.log(`✅ Created Mock AI Chat`);

    // 5. Add Messages to Chat
    await db.insert(messages).values([
      {
        chatId: mockChat!.id,
        role: 'user',
        content: 'How do I build an elite Next.js monorepo?',
      },
      {
        chatId: mockChat!.id,
        role: 'assistant',
        content: 'You start by setting up Turborepo, Drizzle ORM, NextAuth, and Shadcn.',
      }
    ]);
    console.log(`✅ Added Mock Messages`);

    // 6. Create a Mock Document (RAG)
    const [mockDoc] = await db.insert(documents).values({
      title: 'Company Onboarding.pdf',
      userId: mockUser!.id,
    }).returning();
    console.log(`✅ Created Mock Document`);

    // 7. Add Document Chunk (Mocking an embedding)
    await db.insert(documentChunks).values({
      documentId: mockDoc!.id,
      content: 'Employees must use Turborepo for all new frontend applications.',
      embedding: Array(1536).fill(0.01), // Dummy 1536-dimensional vector
    });
    console.log(`✅ Added Mock Vector Embedding Chunk`);

    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during database seeding:', error);
    process.exit(1);
  }
}

main();
