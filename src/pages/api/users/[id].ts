// nextjs api handler
import type { NextApiRequest, NextApiResponse } from "next";

import createHttpError from "http-errors";
import { httpHandler } from "@/server/lib/httpHandler";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";

const handler = httpHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") throw createHttpError.MethodNotAllowed();
    const id = req.query.id as string;
    if (!id) throw createHttpError.BadRequest();

    const session = await getServerAuthSession({ req, res });
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw createHttpError.BadRequest("Not found");

    if (!session || user.id !== session?.user.id) {
      user.email = null;
    }

    return res.status(200).json(user);
  }
);
export default handler;

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   return res.status(200).json({ tests: "alala" });
// }
