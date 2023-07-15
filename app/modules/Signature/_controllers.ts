import { SignIn, SignUp } from "./functions";

export const actionController = async (request: Request) => {
  const formData = Object.fromEntries(await request.formData());

  switch (formData._action) {
    case "sign-in":
      return await SignIn({ formData, request });
    case "sign-up":
      return await SignUp({ formData, request });
    default:
      return null;
  }
};
