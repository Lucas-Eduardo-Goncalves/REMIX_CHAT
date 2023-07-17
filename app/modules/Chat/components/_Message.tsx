import { twMerge } from "tailwind-merge";
import { MessageProps as SchemaMessageProps } from "../_types";
import { useMatches } from "@remix-run/react";

type MessageProps = {
  content: SchemaMessageProps;
  messages: SchemaMessageProps[];
};

export function Message({ content, messages }: MessageProps) {
  const messageIndex = messages.findIndex(
    (message) => message.id === content.id
  );
  const backMessage = messages[messageIndex - 1];

  const matches = useMatches();
  const myUserId = matches[1]?.data.user.id;

  const showSuperior = backMessage
    ? backMessage.user.id === content.user.id
      ? false
      : true
    : true;
  const isMe = content.user.id === myUserId;

  return (
    <div
      className={twMerge(
        "flex flex-col space-y-1",
        showSuperior ? (messageIndex !== 0 ? "mt-6" : "") : "mt-1"
      )}
    >
      {showSuperior && (
        <p className="text-xs font-semibold flex space-x-2 items-center">
          {content.user.name} - {content.createdAt} - {content.time}
        </p>
      )}

      <p
        className={twMerge(
          "p-4 rounded-md",
          isMe ? "bg-neutral-900" : "bg-neutral-900"
        )}
      >
        {content.message}
      </p>
    </div>
  );
}
