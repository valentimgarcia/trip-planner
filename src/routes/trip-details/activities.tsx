import { CircleCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

export function Activities() {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    api
      .get(`trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities));
  }, [tripId]);

  return (
    <div className="space-y-8">
      {activities.map((activity) => {
        return (
          <div key={activity.date} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-zinc-300 font-semibold">
                {format(activity.date, "do")}
              </span>
              <span className="text-xs text-zinc-500">
                {format(activity.date, "EEEE")}
              </span>
            </div>
            {activity.activities.length > 0 ? (
              <div className="space-y-3">
                {activity.activities.map((activity) => {
                  return (
                    <div
                      key={activity.id}
                      className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3"
                    >
                      <CircleCheck className="size-5 text-lime-300" />
                      <span className="text-zinc-100">{activity.title}</span>
                      <span className="text-zinc-400 text-sm ml-auto">
                        {format(activity.occurs_at, "HH:mm")}h
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">
                No activity registered on this date.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
