import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { SignatureClient, SignatureServer } from "~/modules";
import { authenticator } from "~/server/services";

export const action: ActionFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request);
  return await SignatureServer.actionController(request);
};

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request);
  return null;
};

export const meta = SignatureClient.meta;
export default function () {
  return <SignatureClient.View />;
}
