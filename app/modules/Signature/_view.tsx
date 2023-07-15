import {
  Form,
  Link,
  useActionData,
  useLocation,
  useNavigation,
} from "@remix-run/react";
import { Button, Input, Layout } from "~/client/components";

export function View() {
  const actionData = useActionData();
  const { state } = useNavigation();
  const { pathname } = useLocation();
  const isCreatingAccount = pathname === "/auth/sign-up";

  return (
    <Layout.Main className="flex flex-col items-center justify-center">
      <Form
        method="post"
        className="flex w-[28rem] flex-col space-y-4 bg-neutral-100 dark:bg-neutral-900 p-10 rounded-md"
      >
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg">
            {isCreatingAccount ? "Create your account" : "Enter your account"}
          </h1>

          <Input.ErrorMessage content={actionData?.formError} />
        </div>

        {isCreatingAccount && (
          <Input.Container>
            <Input.Label htmlFor="name_input">Name:</Input.Label>
            <Input.Field id="name_input" name="name" />
            <Input.ErrorMessage content={actionData?.fieldErrors?.name} />
          </Input.Container>
        )}

        <Input.Container>
          <Input.Label htmlFor="email_input">Email:</Input.Label>
          <Input.Field id="email_input" name="email" />
          <Input.ErrorMessage content={actionData?.fieldErrors?.email} />
        </Input.Container>

        <Input.Container>
          <Input.Label htmlFor="password_input">Password:</Input.Label>
          <Input.Field id="password_input" name="password" />
          <Input.ErrorMessage content={actionData?.fieldErrors?.password} />
        </Input.Container>

        <Link
          className="text-cyan-700 hover:underline whitespace-nowrap w-min"
          to={isCreatingAccount ? "/auth/sign-in" : "/auth/sign-up"}
        >
          {isCreatingAccount
            ? "Already have an account?"
            : "Don't have an account?"}
        </Link>

        <Button
          disabled={state !== "idle"}
          name="_action"
          value={isCreatingAccount ? "sign-up" : "sign-in"}
        >
          {state === "idle"
            ? isCreatingAccount
              ? "Create"
              : "Enter"
            : "Loading..."}
        </Button>
      </Form>
    </Layout.Main>
  );
}
