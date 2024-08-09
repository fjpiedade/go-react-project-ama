import { useParams } from "react-router-dom";
import amaLogo from "../assets/ama-logo.svg";
import { ArrowRight, ArrowUp, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Message } from "../components/message";
import { createRoom } from "../http/create-room";

export function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  function handleShareRoom() {
    const url = window.location.href.toString();
    if (navigator.share != undefined && navigator.canShare()) {
      navigator.share({ url });
    } else {
      navigator.clipboard.writeText(url);
      toast.info("The room URL was copied to your clipboard!");
    }
  }

  async function handleCreateRoom(data: FormData) {
    const theme = data.get("theme")?.toString();
    if (!theme) {
      return;
    }

    try {
      const { roomId } = await createRoom({ theme });
      navigate(`/room/${roomId}`);
    } catch {
      toast.error("Failed on process to create Room!");
    }
  }

  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
      <div className="flex items-center gap-3 px-3">
        <img src={amaLogo} className="h-5" alt="AMA Logo - Ask me Anything" />
        <span className="text-sm text-zinc-500 truncate">
          Room Code : <span className="text-zinc-300">{roomId}</span>
        </span>

        <button
          type="submit"
          onClick={handleShareRoom}
          className="ml-auto bg-zinc-800 text-zinc-300 px-3 py-1.5 flex items-center gap-3 rounded-lg font-medium text-sm transition-colors hover:bg-zinc-700"
        >
          Share
          <Share2 className="size-4" />
        </button>
      </div>

      <div className="h-px w-full bg-zinc-900" />
      <form
        action={handleCreateRoom}
        className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1"
      >
        <input
          type="text"
          name="theme"
          autoComplete="off"
          placeholder="Which is your question ?"
          className="flex-1 text-sm bg-transparent mx-2 outline-none text-zinc-100 placeholder:text-zinc-500"
          required
        />
        <button
          type="submit"
          className="bg-orange-400 text-orange-950 px-3 py-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-orange-500"
        >
          Create a Question
          <ArrowRight className="size-4" />
        </button>
      </form>

      <ol className="list-decimal list-outside px-3 space-y-8">
        <Message
          text="Como funcionam as goroutines em GoLang e por que elas são importantes para a concorrência e paralelismo?"
          amountOfReactions={99}
        />
        <Message
          text="How funcionam as goroutines em GoLang e por que elas são importantes para a concorrência e paralelismo?"
          amountOfReactions={10}
          answered
        />

        <Message
          text="This funcionam as goroutines em GoLang e por que elas são importantes para a concorrência e paralelismo?"
          amountOfReactions={4}
        />
      </ol>
    </div>
  );
}
