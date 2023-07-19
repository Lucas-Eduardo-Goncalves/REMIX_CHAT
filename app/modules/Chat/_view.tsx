import { Send } from "lucide-react";
import { Button, Input, Layout } from "~/client/components";
import { Message } from "./components";
import { useEffect, useRef } from "react";
import { LoaderProps } from "./_types";
import { useLiveLoader } from "~/client/hooks";
import { Form } from "@remix-run/react";

export function View() {
  const { messages } = useLiveLoader<LoaderProps>();

  const ref = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
      if (formRef.current) formRef.current.reset();
    }
  }, [messages]);

  return (
    <Layout.Main className="w-[unset] py-8 pr-8 flex flex-col space-y-4">
      <section ref={ref} className="flex-1 overflow-auto flex flex-col">
        {messages.map((item) => (
          <Message content={item} messages={messages} key={item.id} />
        ))}
      </section>

      <Form
        ref={formRef}
        method="post"
        className="flex mt-auto w-[100%] space-x-4"
      >
        <Input.Field
          placeholder="Your message..."
          name="message"
          className="flex-1"
        />

        <Button name="_action" value="send-message">
          <Send size="1.5rem" />
        </Button>
      </Form>
    </Layout.Main>
  );
}
