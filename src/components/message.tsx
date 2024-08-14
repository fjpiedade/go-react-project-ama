import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { createMessageReactionReaction } from "../http/create-message-reaction";
import { removeMessageReactionReaction } from "../http/remove-message-reaction";

interface MessageProps {
  id: string;
  text: string;
  amountOfReactions: number;
  answered?: boolean;
}

export function Message({
  id: messageId,
  text,
  amountOfReactions,
  answered = false,
}: MessageProps) {
  const [hasReacted, setHasReacted] = useState(false);

  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Message Components must be used within room page");
  }
  // function handleReactToMessage() {
  //   setHasReacted(true);
  // }

  async function createMessageReactionAction() {
    if (!roomId) {
      return;
    }

    try {
      await createMessageReactionReaction({ roomId, messageId });
    } catch (error) {
      toast.error(
        "Failed putting reaction on the message, please try again later!"
      );
    }
    setHasReacted(true);
  }

  async function removeMessageReactionAction() {
    if (!roomId) {
      return;
    }

    try {
      await removeMessageReactionReaction({ roomId, messageId });
    } catch (error) {
      toast.error(
        "Failed remove reaction on the message, please try again later!"
      );
    }
    setHasReacted(false);
  }

  return (
    <li
      data-answered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
    >
      {text}
      {hasReacted ? (
        <button
          onClick={removeMessageReactionAction}
          type="submit"
          className="mt-3 flex items-center gap-2 bg-transparent text-orange-400 text-sm font-medium transition-colors hover:text-orange-500"
        >
          <ArrowUp className="size-4" />
          Like Question ({amountOfReactions})
        </button>
      ) : (
        <button
          onClick={createMessageReactionAction}
          type="submit"
          className="mt-3 flex items-center gap-2 bg-transparent text-zinc-400 text-sm font-medium transition-colors hover:text-zinc-300"
        >
          <ArrowUp className="size-4" />
          Like Question ({amountOfReactions})
        </button>
      )}
    </li>
  );
}
