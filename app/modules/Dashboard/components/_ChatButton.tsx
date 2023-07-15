import { ChatProps, UserProps } from "../_types";

type ChatButtonProps = {
  chat: ChatProps;
  user: UserProps;
};

export function ChatButton({ chat, user }: ChatButtonProps) {
  return (
    <li className="flex-1 bg-neutral-900 p-3 rounded-md hover:cursor-pointer">
      {chat.users
        .filter((users) => users.id !== user.id)
        .map((users) => (
          <p>{users.name}</p>
        ))}
    </li>
  );
}
