// Normales Instanzieren des Prisma-Clients
// import { PrismaClient } from '@prisma/client';

// export const prisma = new PrismaClient();

// Instanzieren als Solution gegen zu viele offene Instanzen
// Wenn wir im Dev Modus sind, wird nicht jedes Mal eine Instanz erstellt, wenn der Server neu startet
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
	return new PrismaClient();
};

declare global {
	var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export const db = prisma;
