import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { errorHandler } from "./errorHandler";

export function httpHandler(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      errorHandler(error, req, res);
    }
  };
}
