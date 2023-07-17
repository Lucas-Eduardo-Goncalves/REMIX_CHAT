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
    createdAt: z
      .date()
      .transform((createdAt) => new Date(createdAt).toLocaleDateString()),
    updatedAt: z
      .date()
      .transform((updatedAt) => new Date(updatedAt).toLocaleDateString()),
  })
  .transform((data) => ({
    id: data.id,
    users: data.UserChat,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }));

const fetchSchema = z.object({
  user: z.object({ id: z.string(), name: z.string(), email: z.string() }),
  chats: z.array(chat),
});

const addChat = z.object({
  email: z.string().min(1, "Field is required").email("Must be an email"),
});

export const schema = { user, chat, fetchSchema, addChat };
