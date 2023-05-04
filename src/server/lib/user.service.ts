import type { Prisma, User } from "@prisma/client";
import { prisma } from "@/server/db";
import createHttpError from "http-errors";
import { UserStats } from "@/types/stats";

export async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { id } });

  return user;
}

export async function getUserStats(userId: string): Promise<UserStats | null> {
  const stats = await prisma.test.aggregate({
    _avg: {
      accuracy: true,
      time: true,
      wpm: true,
    },
    _max: {
      wpm: true,
      accuracy: true,
    },
    _sum: {
      time: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId,
    },
    _count: {
      _all: true,
    },
  });

  if (!stats) return null;

  return {
    max: stats._max,
    avg: stats._avg,
    totalTime: stats._sum.time,
    count: stats._count._all,
  };
}
