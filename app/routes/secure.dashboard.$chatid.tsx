import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { ChatClient, ChatServer } from "~/modules";
import { authenticator } from "~/server/services";

export const action: ActionFunction = async ({ request, params }) => {
  await authenticator.isAuthenticated(request);
  return await ChatServer.actionController(request, params);
};

export const loader: LoaderFunction = async ({ request, params }) => {
  await authenticator.isAuthenticated(request);
  return await ChatServer.loaderController(request, params);
};

export const meta = ChatClient.meta;
export default function () {
  return <ChatClient.View />;
}
