import { z } from "zod";
import { formControl } from "arkyn_remix";
import { json } from "@remix-run/node";
import { authenticator, prisma } from "~/server/services";

type AddChatProps = {
  request: Request;
  formData: { [x: string]: any };
};

const schema = z.object({
  email: z.string().min(1, "Field is required").email("Must be an email"),
});

export async function addChat({ formData, request }: AddChatProps) {
  const formControlData = await formControl({ schema, formData });
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
      users: { every: { OR: [{ id: friendUser.id }, { id: user.id }] } },
    },
  });
  if (chatAlreadyExists) return json({ formError: "Chat already exists" }, 400);

  await prisma.chat.create({
    data: { users: { connect: [{ id: friendUser.id }, { id: user.id }] } },
    include: { users: true },
  });

  return null;
}
