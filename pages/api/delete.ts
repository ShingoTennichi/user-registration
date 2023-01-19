import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../components/UserType';
import { globalPrisma } from '../../prisma/globalPrismaClient';

export default async function deleteUser(req: NextApiRequest, res: NextApiResponse): Promise<User[] | void> {
    const { id } = JSON.parse(req.body);
    const prisma: globalPrisma = globalPrisma;
    // const deleteUser: User = await prisma.<tableName>.delete({where:{}});
    const deleteUser: User | null = await prisma.user.delete({
    // 'where:{}' can have only one data to identify the data that will be deleted
        where: {
            id: id,
        }
    })
    .catch((err) => {
        console.log(err)
        return null; // return null for json format
    });

    if(deleteUser === null) {
        res.json(deleteUser); // deleteUser has to be sent over to res to terminate this process
        return; // void
    }
    const result = await prisma.user.findMany()
    res.json(result); // result has to be sent over to res to terminate this process
    return result;
}
