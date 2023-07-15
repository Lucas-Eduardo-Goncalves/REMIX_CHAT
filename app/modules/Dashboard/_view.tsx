import { Form, Outlet, useActionData, useLoaderData } from "@remix-run/react";
import { Plus } from "lucide-react";

import { Button, Input, Layout } from "~/client/components";
import type { LoaderProps } from "./_types";
import { ChatButton } from "./components";

export function View() {
  const actionData = useActionData();
  const { chats, user } = useLoaderData<LoaderProps>();

  return (
    <Layout.Main className="p-8 flex flex-1 space-x-6">
      <aside className="flex-1">
        <Form method="POST" className="flex flex-col space-y-1">
          <Input.Label>Add chat:</Input.Label>
          <div className="flex items-center space-x-1">
            <Input.Field
              name="email"
              className="flex-1"
              placeholder="yourfriend@mail.com"
            />
            <Button name="_action" value="add-chat">
              <Plus size={28} />
            </Button>
          </div>
        </Form>
        <Input.ErrorMessage content={actionData?.formError} />

        <div className="h-px flex-1 bg-neutral-900 my-4" />

        <ul className="flex flex-col space-y-2">
          {chats.map((chat) => (
            <ChatButton chat={chat} user={user} />
          ))}
        </ul>
      </aside>

      <section className="flex-[3] ">
        <Outlet />
      </section>
    </Layout.Main>
  );
}
