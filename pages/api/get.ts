import { NextApiRequest, NextApiResponse } from 'next';
import { globalPrisma } from '../../prisma/globalPrismaClient';

type User = {
  id: string,
  firstName: string,
  lastName: string,
  email: string
}

export default async function get(req: NextApiRequest, res: NextApiResponse): Promise<User[]> {
    const prisma: globalPrisma = globalPrisma;
    // const result: User[] = await prisma.<tableName>.findMany();
    const result: User[] = await prisma.user.findMany();
    res.json(result); // result has to be sent over to res to terminate this process
    return result;
}