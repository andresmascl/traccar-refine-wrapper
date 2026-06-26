import { NextResponse } from "next/server";

const TRACCAR_INTERNAL_URL =
  process.env.TRACCAR_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8082"
    : "http://traccar:8082");

const ALLOWED_PATH_PREFIXES = ["/settings/", "/reports/", "/replay", "/geofences"];

function resolveTraccarPath(raw: string): string {
  if (!raw) return "/";
  // Validate against allowlist to prevent SSRF
  const pathOnly = raw.split("?")[0];
  if (!ALLOWED_PATH_PREFIXES.some((p) => pathOnly.startsWith(p))) return "/";
  return raw;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const spaPath = resolveTraccarPath(searchParams.get("path") ?? "");

  const cookieHeader = request.headers.get("cookie") ?? "";

  let res: Response;
  try {
    res = await fetch(TRACCAR_INTERNAL_URL, {
      headers: { cookie: cookieHeader },
    });
  } catch {
    return new NextResponse("Traccar unavailable", { status: 502 });
  }

  if (!res.ok) {
    return new NextResponse("Traccar unavailable", { status: res.status });
  }

  const html = await res.text();

  const injection = [
    `<script>try{window.history.replaceState(null,"",${JSON.stringify(spaPath)});}catch(e){}</script>`,
    `<base href="/traccar/" data-injected="traccar-base">`,
    `<link rel="preconnect" href="https://fonts.googleapis.com">`,
    `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">`,
    `<style id="traccar-font-override">*,body{font-family:'Inter',sans-serif!important;}</style>`,
    // uncomment to hide left sidebar panel:
    // `<style id="traccar-sidebar-hide">[class*="muiltr-"][class*="-sidebar"]{display:none!important;width:0!important;min-width:0!important;}</style>`,

    // hides plus (+) button in side panel
    `<style id="traccar-btn-hide">[class*="MuiButtonBase-root MuiIconButton-root MuiIconButton-edgeEnd MuiIconButton-sizeMedium muiltr-"]{display:none!important;}</style>`,

    // hides bottom buttons in side panel
    `<style id="traccar-btn-hide2">[class*="MuiButtonBase-root MuiBottomNavigationAction-root "]{display:none!important;}</style>`,

    // hides groups drop box of filter search menu in side panel
    `<style id="traccar-btn-hide3">[class*="MuiFormControl-root muiltr-"]:nth-of-type(2){display:none!important;}</style>`,

	// hides groups drop box of filter search menu in side panel
    `<style id="traccar-btn-hide4">[class*="MuiDrawer-root MuiDrawer-anchorLeft MuiDrawer-docked muiltr-"][class*="-desktopDrawer"]{display:none!important;}</style>`,


].join("");

  const patched = html.replace("<head>", `<head>${injection}`);

  return new NextResponse(patched, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}


