import { useAuth } from "@/hooks/userAuth";
import { Link } from "react-router-dom";

export default function Playground() {
  const { user, login, logout } = useAuth();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-primary">Playground</h1>

      {/* Show current user info */}
      <div className="p-4 border rounded-lg bg-card shadow">
        <h2 className="font-semibold text-lg">Current User</h2>
        {user ? (
          <p>
            Logged in as: <strong>{user.email}</strong> ({user.role})
          </p>
        ) : (
          <p className="text-text-secondary">No user logged in</p>
        )}
      </div>

      {/* Buttons to simulate login */}
      <div className="flex gap-4">
        <button
          className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-hover"
          onClick={() => login({ email: "admin@test.com", role: "admin" })}
        >
          Login as Admin
        </button>

        <button
          className="px-4 py-2 rounded bg-secondary text-white hover:bg-secondary-hover"
          onClick={() =>
            login({ email: "organizer@test.com", role: "organizer" })
          }
        >
          Login as Organizer
        </button>

        <button
          className="px-4 py-2 rounded bg-success text-white hover:bg-green-600"
          onClick={() =>
            login({ email: "participant@test.com", role: "participant" })
          }
        >
          Login as Participant
        </button>

        <button
          className="px-4 py-2 rounded bg-error text-white hover:bg-red-600"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* Link to Dashboard */}
      <div>
        <Link
          to="/dashboard"
          className="text-primary underline hover:text-primary-hover"
        >
          Go to Dashboard →
        </Link>
      </div>
    </div>
  );
}
