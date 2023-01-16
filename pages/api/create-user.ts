import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../components/UserType';

export default async function createUser(req: NextApiRequest, res: NextApiResponse): Promise<User[]> {
    const { firstName, lastName, email } = JSON.parse(req.body);
    const prisma: PrismaClient = new PrismaClient();
    // const create: User = await prisma.<tableName>.create({data:{}}});
    const createUser: User = await prisma.user.create({
    // 'data:{}' has to enclose the data that will be sent over to the DB
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email
        }
    });
    console.log(createUser); // debag


    const result: User[] = await prisma.user.findMany(); // return updated users
    res.json(result); // result has to be sent over to res to terminate this process
    prisma.$disconnect(); // prisma has to be disconnected since it makes a connection to its data pool when a Client is initialized
    return result;
}