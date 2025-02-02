import { User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  destination: string;
  startAndEndDates: DateRange | undefined;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  ownerName: string;
  ownerEmail: string;
  setOwnerName: (ownerName: string) => void;
  setOwnerEmail: (ownerEmail: string) => void;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  destination,
  startAndEndDates,
  createTrip,
  ownerName,
  setOwnerName,
  ownerEmail,
  setOwnerEmail,
}: ConfirmTripModalProps) {
  const displayedDate =
    startAndEndDates && startAndEndDates.from && startAndEndDates.to
      ? `${format(startAndEndDates.from, "LLL do")} to ${format(
          startAndEndDates.to,
          "LLL do"
        )}`
      : null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Confirm trip creation</h2>
          <button type="button" onClick={closeConfirmTripModal}>
            <X className="size-5 text-zinc-400" />
          </button>
        </div>
        <p className="text-sm text-zinc-400 mt-2">
          To complete your trip to{" "}
          <span className="font-semibold text-zinc-100">{destination}</span>{" "}
          from{" "}
          <span className="font-semibold text-zinc-100">{displayedDate}</span>,
          please fill in your details below:
        </p>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400" />
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Your personal e-mail"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={!ownerName || !ownerEmail}
            size="full"
          >
            Confirm trip creation
          </Button>
        </form>
      </div>
    </div>
  );
}
