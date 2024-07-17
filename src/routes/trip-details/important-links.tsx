import { Link2, Plus, Tag, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";

export interface Link {
  id: string;
  title: string;
  trip_id: string;
  url: string;
}

export function ImportantLinks() {
  const { tripId } = useParams();
  const [isImportantLinksModalOpen, setIsImportantLinksModalOpen] =
    useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    api
      .get(`trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links));
  }, [tripId]);

  function openImportantLinksModal() {
    setIsImportantLinksModalOpen(true);
  }

  function closeImportantLinksModal() {
    setIsImportantLinksModalOpen(false);
  }

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await api.post(`/trips/${tripId}/links`, {
      title,
      url: link,
    });

    window.document.location.reload();
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Important links</h2>
      <div className="space-y-5">
        {links.map((link) => {
          return (
            <div
              key={link.id}
              className="flex items-center justify-between gap-5"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <a
                  href={link.url}
                  target="_blank"
                  className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                >
                  {link.url}
                </a>
              </div>
              <Link2 className="text-zinc-400 size-5 flex-shrink-0" />
            </div>
          );
        })}
      </div>

      <Button variant="secondary" size="full" onClick={openImportantLinksModal}>
        <Plus className="size-5" />
        Register new link
      </Button>

      {isImportantLinksModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Register new link</h2>
              <button type="button" onClick={closeImportantLinksModal}>
                <X className="size-5 text-zinc-400" />
              </button>
            </div>
            <p className="text-sm text-zinc-400 mt-2 mb-6">
              All guests can view the important links.
            </p>

            <form onSubmit={createLink} className="space-y-3">
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Tag className="size-5 text-zinc-400" />
                <input
                  type="text"
                  name="title"
                  placeholder="Link title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>

              <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Link2 className="size-5 text-zinc-400" />
                <input
                  type="url"
                  name="link"
                  placeholder="URL"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>

              <Button
                variant="primary"
                size="full"
                disabled={!title || title.length < 4 || !link}
              >
                Save link
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
