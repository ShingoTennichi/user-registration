import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
(async () => {
    try {
        // console.log(await prisma.<TableName>.create({ data: {
        //     <columnName>: <inputData>
        // } }));
        console.log(await prisma.testTable.create({ data: {
            name: "testUser"
        } }));
        console.log(await prisma.testTable.findMany());
    } catch (err) {
        console.error("error executing query:", err);
    } finally {
        prisma.$disconnect();
    }
})();
