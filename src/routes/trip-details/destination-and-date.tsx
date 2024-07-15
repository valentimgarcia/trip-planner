import { Calendar, CirclePlus, MapPin } from "lucide-react";
import { Trip } from ".";
import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";

interface DestinationAndDateProps {
  trip: Trip | undefined;
  displayedDate: string | null;
}

export function DestinationAndDate({
  trip,
  displayedDate,
}: DestinationAndDateProps) {
  const navigate = useNavigate();

  function redirectToCreateTrip() {
    navigate("/");
  }

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100 text-lg">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100 text-lg">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button variant="secondary" onClick={redirectToCreateTrip}>
          <CirclePlus className="size-5" />
          Create new trip
        </Button>
      </div>
    </div>
  );
}
