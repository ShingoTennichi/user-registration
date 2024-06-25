import { NextApiRequest, NextApiResponse } from "next";
import { globalPrisma } from "../../prisma/globalPrismaClient";
import { User } from "../../types/types";

export default async function deleteUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<User[] | void> {
  const { id } = JSON.parse(req.body);
  const prisma: globalPrisma = globalPrisma;
  const deleteUser: User | null = await prisma.user
    .delete({
      where: {
        id: id,
      },
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  if (deleteUser === null) {
    res.json(deleteUser);
    return;
  }
  const result = await prisma.user.findMany();
  res.json(result);
  return result;
}
