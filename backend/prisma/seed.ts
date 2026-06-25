import prisma from '../src/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const pass = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@example.com',
      password: pass,
      role: 'ADMIN'
    }
  });
  console.log('Seed finished');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
