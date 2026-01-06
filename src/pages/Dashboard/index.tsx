import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import OrganizerDashboard from "./OrganizerDashboard";
import ParticipantDashboard from "./ParticipantDashboard";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "organizer":
      return <OrganizerDashboard />;
    case "participant":
      return <ParticipantDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
}
