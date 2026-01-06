export interface NavLink {
  label: string;
  path: string;
}

export const ROLE_BASED_LINKS: Record<string, NavLink[]> = {
  organizer: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Events", path: "/events" },
    { label: "Users", path: "/users" },
    { label: "Reports", path: "/reports" },
  ],
  user: [
    { label: "Home", path: "/" },
    { label: "Browse Events", path: "/events" },
    { label: "My Tickets", path: "/my-tickets" },
    { label: "Profile", path: "/profile" },
  ],
};
