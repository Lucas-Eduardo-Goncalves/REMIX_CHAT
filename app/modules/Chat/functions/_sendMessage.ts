import { json } from "@remix-run/node";
import { Params } from "@remix-run/react";
import { formControl } from "arkyn_remix";
import { z } from "zod";
import { EVENTS } from "~/server/event";
import { authenticator, prisma } from "~/server/services";

type SendMessageProps = {
  request: Request;
  formData: { [x: string]: any };
  params: Params;
};

const schema = z.object({
  message: z.string().min(1, "Field is required"),
});

export async function sendMessage({
  formData,
  params,
  request,
}: SendMessageProps) {
  const formControlData = await formControl({ schema, formData });
  if (!formControlData.success) return json(formControlData, 400);
  const { message } = formControlData.data;

  const chatId = params?.chatid;
  if (!chatId) throw new Error("Where's the chat?");

  const { id } = await authenticator.isAuthenticated(request);

  await prisma.message.create({
    data: { message, chatId, userId: id },
  });

  EVENTS.MESSAGE_CHANGED(chatId);

  return null;
}
