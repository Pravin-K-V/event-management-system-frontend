import { useAuth } from "@/hooks/useAuth";
import Navbar from "./Navbar";
import { Navigate, Outlet } from "react-router-dom";

export default function AppLayout() {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <Navbar role={user?.role} userName={user?.fullName} onLogout={logout} />
      <main className="pt-16">
        <Outlet />
      </main>
    </>
  );
}
