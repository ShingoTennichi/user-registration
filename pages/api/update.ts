import { NextApiRequest, NextApiResponse } from "next";
import { globalPrisma } from '../../prisma/globalPrismaClient';

type User = {
  id: string,
  firstName: string,
  lastName: string,
  email: string
}

export default async function updateUser(req: NextApiRequest, res: NextApiResponse): Promise<User[] | void> {
  const { id, firstName, lastName, email } = JSON.parse(req.body);
  const prisma: globalPrisma = globalPrisma;
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: id
    }
  })
    .catch((err) => {
      console.log(err)
      return null; // return null for json format
    });
  if (user === null) {
    res.json(user); // user has to be sent over to res to terminate this process
    return; // void
  }
  // const update: Prisma.Prisma__UserClient<User, never> = prisma.<tableName>.update({where:{},data:{}})
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
    .catch((err) => { console.log(err) });

  const result = await prisma.user.findMany() // return updated users
  res.json(result); // result has to be sent over to res to terminate this process
  return result;
}