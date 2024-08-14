import { useParams } from "react-router-dom";
import { Message } from "./message";
import { getRoomMessages } from "../http/get-room-messages";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { UseMessageWebSockets } from "../hooks/use-messages-websockets";

export function Messages() {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Message Components must be used within room page");
  }

  //using rc19 use method
  //const { messages } = use(getRoomMessages({ roomId }));
  //console.log(messages);

  const { data } = useSuspenseQuery({
    queryKey: [`messages`, roomId],
    queryFn: () => getRoomMessages({ roomId }),
  });

  // console.log(data);

  UseMessageWebSockets({ roomId });

  const sortedMessages = data.messages.sort((a, b) => {
    return b.amountOfReactions - a.amountOfReactions;
  });

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {sortedMessages.map((message) => {
        return (
          <Message
            key={message.id}
            id={message.id}
            text={message.text}
            amountOfReactions={message.amountOfReactions}
            answered={message.answered}
          />
        );
      })}
    </ol>
  );
}
