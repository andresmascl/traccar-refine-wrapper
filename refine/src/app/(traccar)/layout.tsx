import { Layout as BaseLayout } from "@components/refine-ui/layout/layout";
import { authProviderServer } from "@providers/auth-provider/auth-provider.server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function TraccarLayout({ children }: React.PropsWithChildren) {
  const { authenticated, redirectTo } = await authProviderServer.check();
  if (!authenticated) {
    return redirect(redirectTo || "/login");
  }
  const cookieStore = await cookies();
  const sidebarOpen = cookieStore.get("sidebar_state")?.value !== "false";
  return <BaseLayout defaultOpen={sidebarOpen}>{children}</BaseLayout>;
}
