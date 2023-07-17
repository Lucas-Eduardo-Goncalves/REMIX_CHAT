import { Outlet, useLoaderData } from "@remix-run/react";

import { Divider, Layout } from "~/client/components";
import { AddChatForm, ChatButton } from "./components";
import type { LoaderProps } from "./_types";

export function View() {
  const { chats, user } = useLoaderData<LoaderProps>();

  return (
    <Layout.Main className="flex flex-1">
      <section className="flex-1 p-8">
        <AddChatForm />
        <Divider />

        <ul className="flex flex-col space-y-2">
          {chats.map((chat) => (
            <ChatButton key={chat.id} chat={chat} user={user} />
          ))}
        </ul>
      </section>

      <section className="flex-[3]">
        <Outlet />
      </section>
    </Layout.Main>
  );
}
