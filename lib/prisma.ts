import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';

const prismaClientSingleton = () => {
    // Determine database file path (strip file: prefix)
    const dbPath = process.env.DATABASE_URL?.replace("file:", "") || "./dev.db";

    // Initialize Prisma Adapter with config object as requested by type definition
    // @ts-ignore
    const adapter = new PrismaBetterSqlite3({ url: dbPath });

    return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
