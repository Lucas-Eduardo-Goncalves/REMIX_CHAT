import { json } from "@remix-run/node";
import { addChat, fetch } from "./functions";

export const loaderController = async (request: Request) => {
  return json(await fetch({ request }));
};

export const actionController = async (request: Request) => {
  const formData = Object.fromEntries(await request.formData());

  switch (formData._action) {
    case "add-chat":
      return await addChat({ formData, request });
    default:
      return null;
  }
};
