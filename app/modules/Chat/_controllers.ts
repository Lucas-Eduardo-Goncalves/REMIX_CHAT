import { json } from "@remix-run/node";
import { fetch, sendMessage } from "./functions";
import type { Params } from "@remix-run/react";

export async function loaderController(request: Request, params: Params) {
  return json(await fetch({ params }));
}

export async function actionController(request: Request, params: Params) {
  const formData = Object.fromEntries(await request.formData());

  switch (formData._action) {
    case "send-message":
      return await sendMessage({ formData, request, params });
    default:
      return null;
  }
}
