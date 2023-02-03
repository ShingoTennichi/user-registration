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
    // const create: User = await prisma.<tableName>.create({data:{}}});
    const createUser: User | null = await prisma.user.create({
        // 'data:{}' has to enclose the data that will be sent over to the DB
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
    if(createUser === null) {
        res.json(createUser); // createUser has to be sent over to res to terminate this process
        return; // void
    }
    const result: User[] = await prisma.user.findMany();
    res.json(result); // result has to be sent over to res to terminate this process
    return result;
}