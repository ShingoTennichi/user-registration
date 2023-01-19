import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from '../components/UserType';

export default async function updateUser(req: NextApiRequest, res: NextApiResponse) {
    const { id, firstName, lastName, email } = JSON.parse(req.body);
    const prisma: PrismaClient = new PrismaClient();
    // const update: Prisma.Prisma__UserClient<User, never> = prisma.<tableName>.update({where:{},data:{}})
    const update = await prisma.user.update({
        // 'where:{}' is for identifying a user
        where: {
            id: id
        },
        // 'data:{}' is for passing data to update
        data: {
            firstName: firstName
        }
    })
    .catch((err) => {console.log(err)});

    // console.log('fetch result');
    // console.log(update); // * debug
    const result = await prisma.user.findMany() // return updated users
    .finally(() => {
        prisma.$disconnect; // prisma has to be disconnected since it makes a connection to its data pool when a Client is initialized
    })
    res.json(result); // result has to be sent over to res to terminate this process
    return result;
}