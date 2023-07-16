import { formControl } from "arkyn_remix";
import { json } from "@remix-run/node";

import { authenticator, prisma } from "~/server/services";
import { schema } from "../_schemas";

type AddChatProps = {
  request: Request;
  formData: { [x: string]: any };
};

export async function addChat({ formData, request }: AddChatProps) {
  const { addChat } = schema;
  const formControlData = await formControl({ schema: addChat, formData });
  if (!formControlData.success) return json(formControlData, 400);

  const { email } = formControlData.data;
  const user = await authenticator.isAuthenticated(request);

  if (email === user.email) {
    return json({ formError: "This is your user" }, 400);
  }

  const friendUser = await prisma.user.findUnique({ where: { email } });
  if (!friendUser) return json({ formError: "User not exists" }, 400);

  const chatAlreadyExists = await prisma.chat.findFirst({
    where: {
      UserChat: {
        some: { OR: [{ userId: friendUser.id }, { userId: user.id }] },
      },
    },
  });

  if (chatAlreadyExists) return json({ formError: "Chat already exists" }, 400);

  const newChat = await prisma.chat.create({ data: {} });

  await prisma.userChat.createMany({
    data: [
      { userId: user.id, chatId: newChat.id },
      { userId: friendUser.id, chatId: newChat.id },
    ],
  });

  return null;
}
