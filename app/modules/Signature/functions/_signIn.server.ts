import { z } from "zod";
import { compare } from "bcryptjs";
import { formControl } from "arkyn_remix";
import { json, redirect } from "@remix-run/node";
import { prisma, sessionStorage } from "~/server/services";

type SignInProps = {
  request: Request;
  formData: { [x: string]: any };
};

const schema = z.object({
  password: z.string().min(1, "Field is required"),
  email: z.string().min(1, "Field is required").email("Must be an email"),
});

export async function SignIn({ formData, request }: SignInProps) {
  const formControlData = await formControl({ schema, formData });
  if (!formControlData.success) return json(formControlData, 400);

  const { email, password } = formControlData.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return json({ formError: "Incorrect email or password" }, 400);
  if (!(await compare(password, user.password))) {
    return json({ formError: "Incorrect email or password" }, 400);
  }

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
