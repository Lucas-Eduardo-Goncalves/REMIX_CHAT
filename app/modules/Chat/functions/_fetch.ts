import { Params } from "@remix-run/react";
import { prisma } from "~/server/services";
import { schema } from "../_schemas";

type FetchProps = {
  params: Params;
};

export async function fetch({ params }: FetchProps) {
  const chatId = params?.chatid;
  if (!chatId) throw new Error("Where's the chat?");

  const messages = await prisma.message.findMany({
    where: { chatId },
    include: { user: { select: { name: true, id: true } } },
  });

  const { fetch } = schema;
  const fetchReturn = { messages };

  return fetch.parse(fetchReturn);
}
