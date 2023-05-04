import { z } from "zod";

const snapshotSchema = z.object({
  charsTyped: z.number(),
  errors: z.number(),
  errorsDelta: z.number(),
  time: z.number(),
  rawWpm: z.number(),
  wpm: z.number(),
});

export const createTestSchema = z.object({
  type: z.string(),
  time: z.number(),
  charsTyped: z.number(),
  wpm: z.number(),
  accuracy: z.number(),
  // snapshots: z.array(snapshotSchema),
});

export type CreateTest = z.infer<typeof createTestSchema>;
