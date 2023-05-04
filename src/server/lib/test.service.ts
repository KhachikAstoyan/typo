import type { Prisma } from "@prisma/client";
import { prisma } from "@/server/db";
import { createTestSchema, type CreateTest } from "../schemas/createTest";

import createHttpError from "http-errors";

export async function getTestsForUser(userId: string, page = 1, perPage = 10) {
  const tests = await prisma.test.findMany({
    where: { userId },
    take: perPage,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * perPage,
  });
  const count = await prisma.test.count();

  return {
    meta: {
      count,
      page,
      perPage,
    },
    data: tests,
  };
}

export async function addTest(id: string, testResult: CreateTest) {
  if (!id) throw createHttpError.Unauthorized();
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw createHttpError.Unauthorized();

  console.log({ testResult });
  await createTestSchema.parseAsync(testResult);
  const test = await prisma.test.create({
    data: {
      ...(testResult as unknown as Prisma.TestCreateWithoutUserInput),
      user: { connect: { id } },
    },
  });

  return test;
}
