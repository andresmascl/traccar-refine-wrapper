"use client";
import { useState } from "react";

export default function MapPage() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative flex flex-1 min-h-0 w-full overflow-hidden -mx-2 -mt-4 md:-m-4 lg:-mx-6 lg:-mt-6">
      <iframe
        title="Traccar Map"
        src="/traccar-embed"
        className="h-full w-full border-0"
        allow="fullscreen"
        onLoad={() => setLoaded(true)}
      />
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ backgroundColor: "#fafafa", opacity: loaded ? 0 : 1 }}
      />
    </div>
  );
}