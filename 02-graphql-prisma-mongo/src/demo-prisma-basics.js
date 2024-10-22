import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.delete({
    where: {
      email: "ross@test",
    },
  });

  const allUsers = await prisma.user.findMany();

  console.log(allUsers);

  //   const createdUser = await prisma.user.create({
  //     data: {
  //       name: "ross",
  //       age: 31,
  //       email: "ross@test",
  //       password: "ross123",
  //       role: "ADMIN",
  //     },
  //   });

  //   console.log("CREATED USER ", createdUser);
}

main()
  .catch(console.log)
  .finally(() => prisma.$disconnect());
