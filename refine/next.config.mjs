/** @type {import('next').NextConfig} */
const traccarBaseUrl =
  process.env.TRACCAR_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8082"
    : "http://traccar:8082");

const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/traccar/:path*",
        destination: `${traccarBaseUrl}/:path*`,
      },
      {
        source: "/traccar",
        destination: traccarBaseUrl,
      },
      {
        source: "/assets/:path*",
        destination: `${traccarBaseUrl}/assets/:path*`,
      },
      {
        source: "/styles.css",
        destination: `${traccarBaseUrl}/styles.css`,
      },
      {
        source: "/api/:path*",
        destination: `${traccarBaseUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
