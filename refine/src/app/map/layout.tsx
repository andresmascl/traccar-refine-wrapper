import { Layout as BaseLayout } from "@components/refine-ui/layout/layout";
import { authProviderServer } from "@providers/auth-provider/auth-provider.server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({ children }: React.PropsWithChildren) {
  const data = await getData();

  if (!data.authenticated) {
    return redirect(data?.redirectTo || "/login");
  }

  const cookieStore = await cookies();
  const sidebarOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return <BaseLayout defaultOpen={sidebarOpen}>{children}</BaseLayout>;
}

async function getData() {
  const { authenticated, redirectTo } = await authProviderServer.check();
  return { authenticated, redirectTo };
}
