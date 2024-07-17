import { CircleCheck, CircleDashed, Mail, UserPlus, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    api
      .get(`trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  async function confirmGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await api.post(`/trips/${tripId}/invites`, {
      email: email
    });

    window.document.location.reload();
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Guests</h2>
      <div className="space-y-5">
        {participants.map((participant, index) => {
          return (
            <div
              key={participant.id}
              className="flex items-center justify-between gap-5"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {participant.name ?? `Guest ${index}`}
                </span>
                <span className="block text-sm text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>
              {participant.is_confirmed ? (
                <CircleCheck className="text-lime-300 size-5 flex-shrink-0" />
              ) : (
                <CircleDashed className="text-zinc-400 size-5 flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      <Button variant="secondary" size="full" onClick={openGuestsModal}>
        <UserPlus className="size-5" />
        Invite new guest
      </Button>

      {isGuestsModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Invite new guest</h2>
              <button type="button" onClick={closeGuestsModal}>
                <X className="size-5 text-zinc-400" />
              </button>
            </div>
            <p className="text-sm text-zinc-400 mt-2 mb-6">
              To invite a new guest, enter the email address:
            </p>

            <form onSubmit={confirmGuest} className="space-y-3">
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Mail className="size-5 text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>

              <Button
                variant="primary"
                size="full"
                disabled={!email || email.length < 3}
              >
                Invite guest
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
