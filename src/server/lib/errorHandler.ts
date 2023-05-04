import createHttpError from "http-errors";
import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "process";
import { ZodError } from "zod";

export async function errorHandler(
  err: unknown,
  _: NextApiRequest,
  res: NextApiResponse
) {
  const msg = {
    status: 500,
    message: "unknown_error",
  };

  if (err instanceof createHttpError.HttpError) {
    msg.status = err.status;
    msg.message = err.message;
  } else if (err instanceof ZodError) {
    msg.status = 500;
    msg.message = JSON.parse(err.message);
  }

  if (env.NODE_ENV === "development") {
    // @ts-ignore
    msg.message = err.message;
    console.error(err);
  }

  res.status(msg.status).json(err);
}
