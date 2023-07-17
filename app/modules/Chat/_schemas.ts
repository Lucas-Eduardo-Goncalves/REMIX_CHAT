import { z } from "zod";

const user = z.object({
  name: z.string(),
  id: z.string(),
});

const message = z
  .object({
    id: z.string(),
    message: z.string(),
    createdAt: z.date(),
    user: user,
  })
  .transform((data) => ({
    id: data.id,
    message: data.message,
    createdAt: new Date(data.createdAt).toLocaleDateString(),
    time: new Date(data.createdAt).toLocaleTimeString(),
    user: data.user,
  }));

const fetch = z.object({
  messages: z.array(message),
});

export const schema = { user, message, fetch };
