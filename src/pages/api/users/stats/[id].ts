import { httpHandler } from "@/server/lib/httpHandler";
import createHttpError from "http-errors";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserStats } from "@/server/lib/user.service";

export default httpHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") throw createHttpError.MethodNotAllowed();

    const { id } = req.query;
    if (!id || typeof id !== "string") throw createHttpError.BadRequest();

    const stats = await getUserStats(id);

    res.json(stats);
  }
);
