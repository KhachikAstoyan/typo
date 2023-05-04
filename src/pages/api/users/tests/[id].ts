// nextjs api handler
import type { NextApiRequest, NextApiResponse } from "next";

import { getTestsForUser } from "@/server/lib/test.service";
import createHttpError from "http-errors";
import { httpHandler } from "@/server/lib/httpHandler";

const handler = httpHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") throw createHttpError.MethodNotAllowed();
    const id = req.query.id as string;
    if (!id) throw createHttpError.BadRequest();

    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const perPage = req.query.perPage
      ? parseInt(req.query.perPage as string)
      : 10;

    const tests = await getTestsForUser(id, page, perPage);

    return res.status(200).json({ tests });
  }
);
export default handler;

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   return res.status(200).json({ tests: "alala" });
// }
