import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../components/UserType';

export default async function get(req: NextApiRequest, res: NextApiResponse): Promise<User[]> {
    const prisma: PrismaClient = new PrismaClient();
    // const result: User[] = await prisma.<tableName>.findMany();
    const result: User[] = await prisma.user.findMany()
    .finally(() => {
        prisma.$disconnect; // prisma has to be disconnected since it makes a connection to its data pool when a Client is initialized
    });
    res.json(result); // result has to be sent over to res to terminate this process
    return result;
}