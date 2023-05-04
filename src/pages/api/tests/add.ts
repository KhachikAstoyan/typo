import { httpHandler } from "@/server/lib/httpHandler";
import createHttpError from "http-errors";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "@/server/auth";
import { addTest } from "@/server/lib/test.service";

export default httpHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") throw createHttpError.MethodNotAllowed();
    const session = await getServerAuthSession({ req, res });

    if (!session) throw createHttpError.Unauthorized();

    const test = await addTest(session.user.id, req.body);
    res.json(test);
  }
);
