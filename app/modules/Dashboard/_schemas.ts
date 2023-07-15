import { z } from "zod";

const user = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});

const chat = z.object({
  users: z.array(user),
  created_at: z
    .date()
    .transform((created_at) => new Date(created_at).toLocaleDateString()),
  updated_at: z
    .date()
    .transform((updated_at) => new Date(updated_at).toLocaleDateString()),
});

const fetchSchema = z.object({
  user: user,
  chats: z.array(chat),
});

export const schema = { user, chat, fetchSchema };
