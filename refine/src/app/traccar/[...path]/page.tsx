import { notFound } from "next/navigation";

/** Maps Next.js slug → Traccar SPA path (with optional query string) */
const PATH_MAP: Record<string, string> = {
  devices: "/settings/devices",
  drivers: "/settings/drivers",
  geofences: "/settings/geofences",
  maintenance: "/settings/maintenance",
  calendars: "/settings/calendars",
  notifications: "/settings/notifications",
  "reports/combined": "/reports/combined",
  "reports/events": "/reports/events?eventType=allEvents",
  "reports/geofences": "/reports/geofences",
  "reports/trips": "/reports/trips",
  "reports/stops": "/reports/stops",
  "reports/summary": "/reports/summary",
  "reports/chart": "/reports/chart",
  "reports/replay": "/replay",
  "reports/positions": "/reports/route",
  "reports/logs": "/reports/logs",
  "reports/scheduled": "/reports/scheduled",
  "reports/statistics": "/reports/statistics",
  "reports/audit": "/reports/audit",
  users: "/settings/users",
  groups: "/settings/groups",
  preferences: "/settings/preferences",
  server: "/settings/server",
};

type Props = {
  params: Promise<{ path: string[] }>;
};

export default async function TraccarPage({ params }: Props) {
  const { path } = await params;
  const slug = path.join("/");
  const traccarPath = PATH_MAP[slug];

  if (!traccarPath) {
    notFound();
  }

  const src = `/traccar-embed?path=${encodeURIComponent(traccarPath)}`;

  return (
    <div className="flex flex-1 min-h-0 w-full overflow-hidden -mx-2 -mt-4 md:-m-4 lg:-mx-6 lg:-mt-6">
      <iframe
        title={slug}
        src={src}
        className="h-full w-full border-0"
        allow="fullscreen"
      />
    </div>
  );
}
