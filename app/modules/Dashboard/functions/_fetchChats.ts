import { schema } from "../_schemas";
import { authenticator, prisma } from "~/server/services";

type FetchProps = {
  request: Request;
};

export async function fetch({ request }: FetchProps) {
  const user = await authenticator.isAuthenticated(request);

  const chats = await prisma.chat.findMany({
    where: { users: { some: { id: user.id } } },
    include: {
      users: { select: { email: true, id: true, name: true } },
    },
  });

  const fetchReturn = { chats, user };
  const parsedData = schema.fetchSchema.safeParse(fetchReturn);

  if (!parsedData.success) {
    console.log(parsedData.error.errors);
    throw new Error("Fetch failed");
  }

  return parsedData.data;
}
