import { Form, useActionData } from "@remix-run/react";
import { Plus } from "lucide-react";
import { Button, Input } from "~/client/components";

export function AddChatForm() {
  const actionData = useActionData();
  const errorMessage = actionData?.formError || actionData?.fieldErrors?.email;

  return (
    <Form method="POST" className="flex flex-col space-y-1">
      <Input.Container>
        <Input.Label>Add chat:</Input.Label>

        <div className="flex items-center space-x-1">
          <Input.Field
            name="email"
            className="flex-1"
            placeholder="yourfriend@mail.com"
          />
          <Button name="_action" value="add-chat">
            <Plus size="1.6rem" />
          </Button>
        </div>
      </Input.Container>

      <Input.ErrorMessage content={errorMessage} />
    </Form>
  );
}
