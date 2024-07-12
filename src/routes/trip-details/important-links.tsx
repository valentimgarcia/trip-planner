import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Important links</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-5">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Register new AirBnB
            </span>
            <a
              href="#"
              className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
            >
              https://app.rocketseat.com.br/events/nlw-journey/react/aula-02-react
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 flex-shrink-0" />
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Home Rules</span>
            <a
              href="#"
              className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
            >
              https://app.rocketseat.com.br/events/nlw-journey/react/aula-02-react
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 flex-shrink-0" />
        </div>
      </div>

      <Button variant="secondary" size="full">
        <Plus className="size-5" />
        Register a new link
      </Button>
    </div>
  );
}
