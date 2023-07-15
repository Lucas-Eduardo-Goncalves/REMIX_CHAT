import { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = (data) => {
  const meta = [];

  meta.push({ name: "description", content: "Welcome to Remix!" });
  meta.push({ title: "RemixCHAT | Dashboard" });

  return meta;
};
