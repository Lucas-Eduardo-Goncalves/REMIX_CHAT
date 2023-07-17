import { schema } from "../_schemas";
import { authenticator, prisma } from "~/server/services";

type FetchProps = {
  request: Request;
};

export async function fetch({ request }: FetchProps) {
  const user = await authenticator.isAuthenticated(request);

  const chats = await prisma.chat.findMany({
    where: { UserChat: { some: { userId: user.id } } },
    include: {
      UserChat: {
        select: { User: { select: { email: true, id: true, name: true } } },
      },
    },
  });

  const { fetchSchema } = schema;
  const fetchReturn = { chats, user };

  return fetchSchema.parse(fetchReturn);
}
