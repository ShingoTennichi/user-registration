import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../components/UserType';

export default async function deleteUser(req: NextApiRequest, res: NextApiResponse): Promise<User[]> {
    const { id } = JSON.parse(req.body);
    const prisma: PrismaClient = new PrismaClient();
    // const deleteUser: User = await prisma.<tableName>.delete({where:{}});
    const deleteUser = await prisma.user.delete({
    // 'where:{}' can have only one data to identify the data that will be deleted
        where: {
            id: id,
        }
    })
    .catch((err) => console.log(err));
    //console.log(`Deleted successfully. Check the deleted user info:`) // * debug
    //console.log(deleteUser);

    const result = await prisma.user.findMany()
    .finally(() => {
        prisma.$disconnect; // prisma has to be disconnected since it makes a connection to its data pool when a Client is initialized
    }); // return updated users
    res.json(result); // result has to be sent over to res to terminate this process
    return result;
}
