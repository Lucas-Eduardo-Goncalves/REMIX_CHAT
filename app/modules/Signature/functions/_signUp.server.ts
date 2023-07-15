import { z } from "zod";
import { hash } from "bcryptjs";
import { formControl } from "arkyn_remix";
import { json, redirect } from "@remix-run/node";
import { prisma, sessionStorage } from "~/server/services";

type SignUpProps = {
  request: Request;
  formData: { [x: string]: any };
};

const schema = z.object({
  password: z.string().min(1, "Field is required"),
  email: z.string().min(1, "Field is required").email("Must be an email"),
  name: z.string().min(1, "Field is required"),
});

export async function SignUp({ formData, request }: SignUpProps) {
  const formControlData = await formControl({ schema, formData });
  if (!formControlData.success) return json(formControlData, 400);

  const { email, password, name } = formControlData.data;
  const userAlreadyExists = await prisma.user.findUnique({ where: { email } });

  if (!!userAlreadyExists) {
    return json({ formError: "User already exists" }, 400);
  }

  const user = await prisma.user.create({
    data: { name, email, password: await hash(password, 15) },
  });

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  session.set("user_session", {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  });

  return redirect("/secure/dashboard", {
    headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
  });
}
