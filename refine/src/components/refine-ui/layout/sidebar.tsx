"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent as ShadcnSidebarContent,
  SidebarHeader as ShadcnSidebarHeader,
  SidebarRail as ShadcnSidebarRail,
  SidebarTrigger as ShadcnSidebarTrigger,
  useSidebar as useShadcnSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  useGetIdentity,
  useLink,
  useMenu,
  useRefineOptions,
  type TreeMenuItem,
} from "@refinedev/core";
import {
  Activity,
  BarChart2,
  Bell,
  Calendar,
  ChevronRight,
  CircleStop,
  Clock,
  ClipboardList,
  FileText,
  Globe,
  LayoutList,
  LineChart,
  ListIcon,
  Logs,
  MapPin,
  Navigation,
  Play,
  Route,
  ScrollText,
  Server,
  Settings,
  Shapes,
  Shield,
  Users,
  UsersRound,
  Wrench,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

export function Sidebar() {
  const { open } = useShadcnSidebar();
  const { menuItems, selectedKey: refineSelectedKey } = useMenu();
  const pathname = usePathname();
  const { data: identity } = useGetIdentity<{ roles?: string[] }>();
  const isAdmin = identity?.roles?.includes("admin") ?? false;

  const selectedKey = pathname === "/map" ? "map" : (refineSelectedKey || pathname);

  const reportsChildren: TreeMenuItem[] = [
    { key: "/reports/combined",    name: "combined",    route: "/reports/combined",    meta: { label: "Combined",   icon: <LayoutList    size={16} /> } } as TreeMenuItem,
    { key: "/reports/events",      name: "events",      route: "/reports/events",      meta: { label: "Events",     icon: <Activity      size={16} /> } } as TreeMenuItem,
    { key: "/reports/geofences",   name: "r-geofences", route: "/reports/geofences",   meta: { label: "Geofences",  icon: <Shapes        size={16} /> } } as TreeMenuItem,
    { key: "/reports/trips",       name: "trips",       route: "/reports/trips",       meta: { label: "Trips",      icon: <Route         size={16} /> } } as TreeMenuItem,
    { key: "/reports/stops",       name: "stops",       route: "/reports/stops",       meta: { label: "Stops",      icon: <CircleStop    size={16} /> } } as TreeMenuItem,
    { key: "/reports/summary",     name: "summary",     route: "/reports/summary",     meta: { label: "Summary",    icon: <ClipboardList size={16} /> } } as TreeMenuItem,
    { key: "/reports/chart",       name: "chart",       route: "/reports/chart",       meta: { label: "Chart",      icon: <LineChart     size={16} /> } } as TreeMenuItem,
    { key: "/reports/replay",      name: "replay",      route: "/reports/replay",      meta: { label: "Replay",     icon: <Play          size={16} /> } } as TreeMenuItem,
    { key: "/reports/positions",   name: "positions",   route: "/reports/positions",   meta: { label: "Positions",  icon: <MapPin        size={16} /> } } as TreeMenuItem,
    { key: "/reports/logs",        name: "logs",        route: "/reports/logs",        meta: { label: "Logs",       icon: <ScrollText    size={16} /> } } as TreeMenuItem,
    { key: "/reports/scheduled",   name: "scheduled",   route: "/reports/scheduled",   meta: { label: "Scheduled",  icon: <Clock         size={16} /> } } as TreeMenuItem,
    { key: "/reports/statistics",  name: "statistics",  route: "/reports/statistics",  meta: { label: "Statistics", icon: <BarChart2     size={16} /> } } as TreeMenuItem,
    { key: "/reports/audit",       name: "audit",       route: "/reports/audit",       meta: { label: "Audit",      icon: <Shield        size={16} /> } } as TreeMenuItem,
  ];

  const traccarItems: TreeMenuItem[] = [
    { key: "/devices",       name: "devices",       route: "/devices",       meta: { label: "Devices",       icon: <Navigation size={16} /> } } as TreeMenuItem,
    { key: "/drivers",       name: "drivers",       route: "/drivers",       meta: { label: "Drivers",        icon: <UsersRound size={16} /> } } as TreeMenuItem,
    { key: "/geofences",     name: "geofences",     route: "/geofences",     meta: { label: "Geofences",      icon: <Shapes     size={16} /> } } as TreeMenuItem,
    { key: "/maintenance",   name: "maintenance",   route: "/maintenance",   meta: { label: "Maintenance",    icon: <Wrench     size={16} /> } } as TreeMenuItem,
    { key: "/calendars",     name: "calendars",     route: "/calendars",     meta: { label: "Calendars",      icon: <Calendar   size={16} /> } } as TreeMenuItem,
    { key: "/notifications", name: "notifications", route: "/notifications", meta: { label: "Notifications",  icon: <Bell       size={16} /> } } as TreeMenuItem,
    {
      key: "reports", name: "reports", route: undefined,
      meta: { label: "Reports", icon: <FileText size={16} /> },
      children: reportsChildren,
    } as unknown as TreeMenuItem,
    { key: "/users",         name: "t-users",       route: "/users",         meta: { label: "Users",          icon: <Users      size={16} /> } } as TreeMenuItem,
    { key: "/groups",        name: "groups",        route: "/groups",        meta: { label: "Groups",         icon: <UsersRound size={16} /> } } as TreeMenuItem,
    ...(isAdmin ? [
      { key: "/preferences", name: "preferences",   route: "/preferences",   meta: { label: "Preferences",    icon: <Settings   size={16} /> } } as TreeMenuItem,
      { key: "/server",      name: "server",        route: "/server",        meta: { label: "Server",         icon: <Server     size={16} /> } } as TreeMenuItem,
    ] : []),
  ];

  const mapItem = {
    key: "map",
    name: "map",
    route: "/map",
    meta: { label: "Map", icon: <MapPin /> },
  } as TreeMenuItem;

  return (
    <ShadcnSidebar collapsible="icon" className={cn("border-none")}>
      <ShadcnSidebarRail />
      <SidebarHeader />
      <ShadcnSidebarContent
        className={cn(
          "transition-discrete",
          "duration-200",
          "flex",
          "flex-col",
          "gap-2",
          "pt-2",
          "pb-2",
          "border-r",
          "border-border",
          {
            "px-3": open,
            "px-1": !open,
          }
        )}
      >
        <SidebarItemLink item={mapItem} selectedKey={selectedKey} />
        {traccarItems.map((item) => (
          <SidebarItem key={item.key || item.name} item={item} selectedKey={selectedKey} />
        ))}
        {menuItems.map((item: TreeMenuItem) => (
          <SidebarItem
            key={item.key || item.name}
            item={item}
            selectedKey={selectedKey}
          />
        ))}
      </ShadcnSidebarContent>
    </ShadcnSidebar>
  );
}

type MenuItemProps = {
  item: TreeMenuItem;
  selectedKey?: string;
};

function SidebarItem({ item, selectedKey }: MenuItemProps) {
  const { open } = useShadcnSidebar();

  if (item.meta?.group) {
    return <SidebarItemGroup item={item} selectedKey={selectedKey} />;
  }

  if (item.children && item.children.length > 0) {
    if (open) {
      return <SidebarItemCollapsible item={item} selectedKey={selectedKey} />;
    }
    return <SidebarItemDropdown item={item} selectedKey={selectedKey} />;
  }

  return <SidebarItemLink item={item} selectedKey={selectedKey} />;
}

function SidebarItemGroup({ item, selectedKey }: MenuItemProps) {
  const { children } = item;
  const { open } = useShadcnSidebar();

  return (
    <div className={cn("border-t", "border-sidebar-border", "pt-4")}>
      <span
        className={cn(
          "ml-3",
          "block",
          "text-xs",
          "font-semibold",
          "uppercase",
          "text-muted-foreground",
          "transition-all",
          "duration-200",
          {
            "h-8": open,
            "h-0": !open,
            "opacity-0": !open,
            "opacity-100": open,
            "pointer-events-none": !open,
            "pointer-events-auto": open,
          }
        )}
      >
        {getDisplayName(item)}
      </span>
      {children && children.length > 0 && (
        <div className={cn("flex", "flex-col")}>
          {children.map((child: TreeMenuItem) => (
            <SidebarItem
              key={child.key || child.name}
              item={child}
              selectedKey={selectedKey}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarItemCollapsible({ item, selectedKey }: MenuItemProps) {
  const { name, children } = item;

  const chevronIcon = (
    <ChevronRight
      className={cn(
        "h-4",
        "w-4",
        "shrink-0",
        "text-muted-foreground",
        "transition-transform",
        "duration-200",
        "group-data-[state=open]:rotate-90"
      )}
    />
  );

  return (
    <Collapsible key={`collapsible-${name}`} className={cn("w-full", "group")}>
      <CollapsibleTrigger asChild>
        <SidebarButton item={item} rightIcon={chevronIcon} />
      </CollapsibleTrigger>
      <CollapsibleContent className={cn("ml-6", "flex", "flex-col", "gap-2")}>
        {children?.map((child: TreeMenuItem) => (
          <SidebarItem
            key={child.key || child.name}
            item={child}
            selectedKey={selectedKey}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

function SidebarItemDropdown({ item, selectedKey }: MenuItemProps) {
  const { children } = item;
  const Link = useLink();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarButton item={item} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        {children?.map((child: TreeMenuItem) => {
          const { key: childKey } = child;
          const isSelected = childKey === selectedKey;

          return (
            <DropdownMenuItem key={childKey || child.name} asChild>
              <Link
                to={child.route || ""}
                className={cn("flex w-full items-center gap-2", {
                  "bg-accent text-accent-foreground": isSelected,
                })}
              >
                <ItemIcon
                  icon={child.meta?.icon ?? child.icon}
                  isSelected={isSelected}
                />
                <span>{getDisplayName(child)}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarItemLink({ item, selectedKey }: MenuItemProps) {
  const isSelected = item.key === selectedKey;

  return <SidebarButton item={item} isSelected={isSelected} asLink={true} />;
}

function SidebarHeader() {
  const { title } = useRefineOptions();
  const { open, isMobile } = useShadcnSidebar();

  return (
    <ShadcnSidebarHeader
      className={cn(
        "p-0",
        "h-16",
        "border-b",
        "border-border",
        "flex-row",
        "items-center",
        "justify-between",
        "overflow-hidden"
      )}
    >
      <div
        className={cn(
          "whitespace-nowrap",
          "flex",
          "flex-row",
          "h-full",
          "items-center",
          "justify-start",
          "gap-2",
          "transition-discrete",
          "duration-200",
          {
            "pl-3": !open,
            "pl-5": open,
          }
        )}
      >
        <div>{title.icon}</div>
        <h2
          className={cn(
            "text-sm",
            "font-bold",
            "transition-opacity",
            "duration-200",
            {
              "opacity-0": !open,
              "opacity-100": open,
            }
          )}
        >
          {title.text}
        </h2>
      </div>

    </ShadcnSidebarHeader>
  );
}

function getDisplayName(item: TreeMenuItem) {
  return item.meta?.label ?? item.label ?? item.name;
}

type IconProps = {
  icon: React.ReactNode;
  isSelected?: boolean;
};

function ItemIcon({ icon, isSelected }: IconProps) {
  return (
    <div
      className={cn("w-4", {
        "text-muted-foreground": !isSelected,
        "text-sidebar-primary-foreground": isSelected,
      })}
    >
      {icon ?? <ListIcon />}
    </div>
  );
}

type SidebarButtonProps = React.ComponentProps<typeof Button> & {
  item: TreeMenuItem;
  isSelected?: boolean;
  rightIcon?: React.ReactNode;
  asLink?: boolean;
  onClick?: () => void;
};

function SidebarButton({
  item,
  isSelected = false,
  rightIcon,
  asLink = false,
  className,
  onClick,
  ...props
}: SidebarButtonProps) {
  const Link = useLink();

  const buttonContent = (
    <>
      <ItemIcon icon={item.meta?.icon ?? item.icon} isSelected={isSelected} />
      <span
        className={cn("tracking-[-0.00875rem]", {
          "flex-1": rightIcon,
          "text-left": rightIcon,
          "line-clamp-1": !rightIcon,
          truncate: !rightIcon,
          "font-normal": !isSelected,
          "font-semibold": isSelected,
          "text-sidebar-primary-foreground": isSelected,
          "text-foreground": !isSelected,
        })}
      >
        {getDisplayName(item)}
      </span>
      {rightIcon}
    </>
  );

  return (
    <Button
      asChild={!!(asLink && item.route)}
      variant="ghost"
      size="lg"
      className={cn(
        "flex w-full items-center justify-start gap-2 py-2 !px-3 text-sm",
        {
          "bg-sidebar-primary": isSelected,
          "hover:!bg-sidebar-primary/90": isSelected,
          "text-sidebar-primary-foreground": isSelected,
          "hover:text-sidebar-primary-foreground": isSelected,
        },
        className
      )}
      onClick={onClick}
      {...props}
    >
      {asLink && item.route ? (
        <Link to={item.route} className={cn("flex w-full items-center gap-2")}>
          {buttonContent}
        </Link>
      ) : (
        buttonContent
      )}
    </Button>
  );
}

Sidebar.displayName = "Sidebar";
