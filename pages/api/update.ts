import { NextApiRequest, NextApiResponse } from "next";
import { globalPrisma } from "../../prisma/globalPrismaClient";
import { User } from "../../types/types";

export default async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<User[] | void> {
  const { id, firstName, lastName, email } = JSON.parse(req.body);
  const prisma: globalPrisma = globalPrisma;
  const user: User | null = await prisma.user
    .findUnique({
      where: {
        id: id,
      },
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  if (user === null) {
    res.json(user);
    return;
  }

  const update: User | void = await prisma.user
    .update({
      where: {
        id: id,
      },
      data: {
        firstName: firstName === "" ? user.firstName : firstName,
        lastName: lastName === "" ? user.lastName : lastName,
        email: email === "" ? user.email : email,
      },
    })
    .catch((err) => {
      console.log(err);
    });

  const result = await prisma.user.findMany();
  res.json(result);
  return result;
}
