import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Activities } from "./activities";
import { CreateActivityModal } from "./create-activity-modal";
import { DestinationAndDate } from "./destination-and-date";
import { Guests } from "./guests";
import { ImportantLinks } from "./important-links";
import { Button } from "../../components/button";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

export interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export function TripDetailsPage() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();

  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  useEffect(() => {
    api.get(`trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);

  const displayedDate =
    trip?.starts_at && trip?.ends_at
      ? `${format(trip?.starts_at, "LLL do")} to ${format(
          trip?.ends_at,
          "LLL do"
        )}`
      : null;

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDate trip={trip} displayedDate={displayedDate} />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Activities</h2>
            <Button onClick={openCreateActivityModal} variant="primary">
              <Plus className="size-5 text-lime-950" />
              Register activity
            </Button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
          starts_at={trip?.starts_at}
          ends_at={trip?.ends_at}
        />
      )}
    </div>
  );
}
