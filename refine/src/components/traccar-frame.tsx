"use client";
import { useState } from "react";

export function TraccarFrame({ path, title }: { path: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const src = `/traccar-embed?path=${encodeURIComponent(path)}`;
  return (
    <div className="relative flex flex-1 min-h-0 w-full overflow-hidden -mx-2 -mt-4 md:-m-4 lg:-mx-6 lg:-mt-6">
      <iframe
        title={title}
        src={src}
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
