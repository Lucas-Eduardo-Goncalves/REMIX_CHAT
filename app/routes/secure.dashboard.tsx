import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { DashboardClient, DashboardServer } from "~/modules";
import { authenticator } from "~/server/services";

export const action: ActionFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request);
  return await DashboardServer.actionController(request);
};

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request);
  return await DashboardServer.loaderController(request);
};

export const meta = DashboardClient.meta;
export default function () {
  return <DashboardClient.View />;
}
