import { TraccarFrame } from "@/components/traccar-frame";
import { notFound } from "next/navigation";

const REPORT_MAP: Record<string, { path: string; title: string }> = {
  combined:   { path: "/reports/combined",                   title: "Combined"   },
  events:     { path: "/reports/events?eventType=allEvents", title: "Events"     },
  geofences:  { path: "/reports/geofences",                  title: "Geofences"  },
  trips:      { path: "/reports/trips",                      title: "Trips"      },
  stops:      { path: "/reports/stops",                       title: "Stops"      },
  summary:    { path: "/reports/summary",                    title: "Summary"    },
  chart:      { path: "/reports/chart",                      title: "Chart"      },
  replay:     { path: "/replay",                             title: "Replay"     },
  positions:  { path: "/reports/route",                      title: "Positions"  },
  logs:       { path: "/reports/logs",                       title: "Logs"       },
  scheduled:  { path: "/reports/scheduled",                  title: "Scheduled"  },
  statistics: { path: "/reports/statistics",                 title: "Statistics" },
  audit:      { path: "/reports/audit",                      title: "Audit"      },
};

type Props = { params: Promise<{ report: string }> };

export default async function ReportPage({ params }: Props) {
  const { report } = await params;
  const mapping = REPORT_MAP[report];
  if (!mapping) notFound();
  return <TraccarFrame path={mapping.path} title={mapping.title} />;
}
