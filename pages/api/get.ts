import { NextApiRequest, NextApiResponse } from 'next';
import { globalPrisma } from '../../prisma/globalPrismaClient';
import { User } from '../../types/types';

export default async function get(req: NextApiRequest, res: NextApiResponse): Promise<User[]> {
  const prisma: globalPrisma = globalPrisma;
  const result: User[] = await prisma.user.findMany();
  res.json(result);
  return result;
}