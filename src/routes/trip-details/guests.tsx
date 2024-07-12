import { CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";

export function Guests() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Guests</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-5">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Valentim Garcia
            </span>
            <span className="block text-sm text-zinc-400 truncate">
              https://app.rocketseat.com.br/events/nlw-journey/react/aula-02-react
            </span>
          </div>
          <CircleDashed className="text-zinc-400 size-5 flex-shrink-0" />
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Bernardo Oliveira
            </span>
            <span className="block text-sm text-zinc-400 truncate">
              https://app.rocketseat.com.br/events/nlw-journey/react/aula-02-react
            </span>
          </div>
          <CircleDashed className="text-zinc-400 size-5 flex-shrink-0" />
        </div>
      </div>

      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        Manage guests
      </Button>
    </div>
  );
}
