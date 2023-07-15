import { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = (data) => {
  const meta = [];
  meta.push({ name: "description", content: "Welcome to Remix!" });

  if (data.location.pathname === "/auth/sign-in") {
    meta.push({ title: "RemixCHAT | SignIn" });
  }

  if (data.location.pathname === "/auth/sign-un") {
    meta.push({ title: "RemixCHAT | SignUP" });
  }

  return meta;
};
