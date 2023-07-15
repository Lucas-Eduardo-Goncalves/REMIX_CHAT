import { createCookieSessionStorage } from "@remix-run/node";

import { z } from "zod";
import { Authenticator } from "arkyn_remix";

const user_schema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  createdAt: z.string(),
});

type User = z.infer<typeof user_schema>;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "remix:REMIX_CHAT_SESSION",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
    secrets: ["s3cret1B0ok"],
    secure: false,
  },
});

const authenticator = new Authenticator<User, User>(sessionStorage, (props) => {
  const url = new URL(props.request.url);
  const pathname = url.pathname;

  if (props.isSuccess === true) {
    const routesWithoutLogins = ["/auth/sign-in", "/auth/sign-up"];

    if (routesWithoutLogins.includes(pathname)) {
      props.redirect("/secure/dashboard");
    }

    return props.user;
  }

  if (props.isSuccess === false) {
    if (!pathname.includes("/auth")) {
      props.redirect(`/auth/sign-in?redirectURL=${pathname}`);
    }
  }

  return {} as any;
});

export { authenticator, sessionStorage, user_schema };
export type { User };
