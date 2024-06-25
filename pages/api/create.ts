import { NextApiRequest, NextApiResponse } from 'next';
import { globalPrisma } from '../../prisma/globalPrismaClient';

type User = {
  id: string,
  firstName: string,
  lastName: string,
  email: string
}

export default async function createUser(req: NextApiRequest, res: NextApiResponse): Promise<User[] | void> {
  const { firstName, lastName, email } = JSON.parse(req.body);
  const prisma: globalPrisma = globalPrisma;
  const createUser: User | null = await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email
    }
  })
    .catch((err) => {
      console.log(err);
      return null;
    });
  if (createUser === null) {
    res.json(createUser);
    return;
  }
  const result: User[] = await prisma.user.findMany();
  res.json(result);
  return result;
}