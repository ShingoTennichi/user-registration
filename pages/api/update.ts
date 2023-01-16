import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from '../components/UserType';

export default async function updateUser(req: NextApiRequest, res: NextApiResponse): Promise<User[]> {
    const { id, firstName, lastName, email } = JSON.parse(req.body);
    console.log(req.body);
    const prisma: PrismaClient = new PrismaClient();
    // const update: Prisma.Prisma__UserClient<User, never> = prisma.<tableName>.update({where:{},data:{}})
    const update: Promise<User> = prisma.user.update({
        // 'where:{}' is for identifying a user
        where: {
            id: id
        },
        // 'data:{}' is for passing data to update
        data: {
            firstName: firstName
        }
    })
    .finally(() => {
        console.log('Updated successfully: ')
    });


    const result = prisma.user.findMany(); // return updated users
    res.json(result); // result has to be sent over to res to terminate this process
    prisma.$disconnect; // prisma has to be disconnected since it makes a connection to its data pool when a Client is initialized
    return result;
}