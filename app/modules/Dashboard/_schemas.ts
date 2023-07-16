import { z } from "zod";

const user = z
  .object({
    User: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
    }),
  })
  .transform((data) => ({
    id: data.User.id,
    name: data.User.name,
    email: data.User.email,
  }));

const chat = z
  .object({
    id: z.string(),
    UserChat: z.array(user),
    created_at: z
      .date()
      .transform((created_at) => new Date(created_at).toLocaleDateString()),
    updated_at: z
      .date()
      .transform((updated_at) => new Date(updated_at).toLocaleDateString()),
  })
  .transform((data) => ({
    id: data.id,
    users: data.UserChat,
    created_at: data.created_at,
    updated_at: data.updated_at,
  }));

const fetchSchema = z.object({
  user: z.object({ id: z.string(), name: z.string(), email: z.string() }),
  chats: z.array(chat),
});

const addChat = z.object({
  email: z.string().min(1, "Field is required").email("Must be an email"),
});

export const schema = { user, chat, fetchSchema, addChat };
