import { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = (data) => {
  const meta = [];
  meta.push({ title: "RemixCHAT | Chat" });

  return meta;
};
