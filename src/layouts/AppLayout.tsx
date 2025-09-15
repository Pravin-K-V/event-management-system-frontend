import { useAuth } from "@/hooks/useAuth";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <>
      <Navbar role={user?.role} userName={user?.fullName} onLogout={logout} />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}
