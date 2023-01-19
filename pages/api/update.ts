import { NextApiRequest, NextApiResponse } from "next";
import { User } from '../components/UserType';
import { globalPrisma } from '../../prisma/globalPrismaClient';

export default async function updateUser(req: NextApiRequest, res: NextApiResponse): Promise<User[] | void> {
    const { id, firstName, lastName, email } = JSON.parse(req.body);
    const prisma: globalPrisma = globalPrisma;
    // const update: Prisma.Prisma__UserClient<User, never> = prisma.<tableName>.update({where:{},data:{}})
    const user: User | null = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    .catch((err) => {
        console.log(err)
        return null;
    });
    if(user !== null) {
        const update: User | void = await prisma.user.update({
            // 'where:{}' is for identifying a user
            where: {
                id: id
            },
            // 'data:{}' is for passing data to update
            data: {
                firstName: firstName === '' ? user.firstName : firstName,
                lastName: lastName === '' ? user.lastName : lastName,
                email: email === '' ? user.email : email
            }
        })
        .catch((err) => {console.log(err)});
        // console.log('fetch result');
        // console.log(update); // * debug
        const result = await prisma.user.findMany() // return updated users
        // .finally(() => {
        //     prisma.$disconnect; // prisma has to be disconnected since it makes a connection to its data pool when a Client is initialized
        // })
        res.json(result); // result has to be sent over to res to terminate this process
        return result;
    } else {
        res.json(user); // user has to be sent over to res to terminate this process
        return; // void
    }
}