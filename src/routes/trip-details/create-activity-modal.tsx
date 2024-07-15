import { addHours, endOfDay } from "date-fns";
import { Calendar, Tag, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
  starts_at?: string;
  ends_at?: string;
}

export function CreateActivityModal({
  closeCreateActivityModal,
  starts_at,
  ends_at,
}: CreateActivityModalProps) {
  const { tripId } = useParams();
  const [title, setTitle] = useState("");
  const [occursAt, setOccursAt] = useState("");

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at: occursAt,
    });

    window.document.location.reload();
  }

  const minCalendarDate = addHours(starts_at || "", 1)
    .toISOString()
    .slice(0, -8);
  const maxCalendarDate = addHours(endOfDay(ends_at || ""), 1)
    .toISOString()
    .slice(0, -8);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Register activity</h2>
          <button type="button" onClick={closeCreateActivityModal}>
            <X className="size-5 text-zinc-400" />
          </button>
        </div>
        <p className="text-sm text-zinc-400 mt-2 mb-6">
          All guests can view the activities.
        </p>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              name="title"
              placeholder="What is the activity?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <input
              type="datetime-local"
              min={minCalendarDate}
              max={maxCalendarDate}
              name="occurs_at"
              placeholder="Date and time of activity"
              value={occursAt}
              onChange={(e) => setOccursAt(e.target.value)}
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button
            variant="primary"
            size="full"
            disabled={!title || title.length < 4 || !occursAt}
          >
            Save activity
          </Button>
        </form>
      </div>
    </div>
  );
}
