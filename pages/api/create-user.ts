import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../components/UserType';
import { globalPrisma } from '../../prisma/globalPrismaClient';

export default async function createUser(req: NextApiRequest, res: NextApiResponse) {
    const { firstName, lastName, email } = JSON.parse(req.body);

    const prisma: globalPrisma = globalPrisma;
    // const create: User = await prisma.<tableName>.create({data:{}}});
    const createUser: User | void = await prisma.user.create({
        // 'data:{}' has to enclose the data that will be sent over to the DB
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email
        }
    })
    .catch((err) => console.log(err));

    // console.log(createUser); // * debag
    const result: User[] = await prisma.user.findMany()
    // .finally(() => {
    //     prisma.$disconnect; // prisma has to be disconnected since it makes a connection to its data pool when a Client is initialized
    // }); // return updated users
    res.json(result); // result has to be sent over to res to terminate this process
    
    return result;
}