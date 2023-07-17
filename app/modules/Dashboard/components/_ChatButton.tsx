import { useNavigate, useParams } from "@remix-run/react";
import { ChatProps, UserProps } from "../_types";
import { twMerge } from "tailwind-merge";

type ChatButtonProps = {
  chat: ChatProps;
  user: UserProps;
};

export function ChatButton({ chat, user }: ChatButtonProps) {
  const navigate = useNavigate();
  const params = useParams();
  const handleNavigateUser = () => navigate(`/secure/dashboard/${chat.id}`);

  const isActive = chat.id === params?.chatid;

  return (
    <li
      onClick={handleNavigateUser}
      className={twMerge(
        "flex-1 bg-neutral-900 p-3 rounded-md hover:cursor-pointer",
        isActive && "bg-cyan-900 hover:cursor-not-allowed"
      )}
    >
      {chat.users
        .filter((users) => users.id !== user.id)
        .map((users) => (
          <p key={users.id}>{users.name}</p>
        ))}
    </li>
  );
}
