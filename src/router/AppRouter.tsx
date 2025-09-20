import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import EventListingPage from "@/pages/events/EventListingPage";
import CreateEventPage from "@/features/events/pages/CreateEventPage";
import EditEventPage from "@/features/events/pages/EditEventPage";
import Playground from "@/pages/Playground";
import PrivateRoute from "@/router/PrivateRoute";
import { useAuth } from "@/hooks/useAuth";
import GuestHome from "@/pages/Home/GuestHome";
import RoleBasedRoute from "./RoleBasedRoute";
import AppLayout from "@/layouts/AppLayout";
import NotFoundPage from "@/pages/NotFoundPage";
import ProfilePage from "@/pages/ProfilePage";
import UserTable from "@/components/users/UserTable";
import { sampleOrganizers, sampleParticipants } from "@/pages/Admin/sampleData";

function RootRouter() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/events" replace />;
  } else {
    return <GuestHome />;
  }
}

function GuestRoute() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/events" />;
  }

  return <Outlet />;
}

function ProfilePageInformation() {
  // const { user } = useAuth();
  const storedUser = localStorage.getItem("auth_user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <ProfilePage
      fullName={user?.fullName}
      role={user?.role}
      email={user?.email}
      phone={user?.phone}
    />
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRouter />,
  },
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/events",
        element: <AppLayout />,
        children: [{ path: "", element: <EventListingPage /> }],
      },
      {
        element: <RoleBasedRoute allowedRoles={["admin", "organizer"]} />,
        children: [
          { path: "/events/create", element: <CreateEventPage /> },
          { path: "/events/:id/edit", element: <EditEventPage /> },
        ],
      },
      {
        path: "/profile",
        element: <AppLayout />,
        children: [
          {
            path: "",
            element: <ProfilePageInformation />,
          },
        ],
      },
      { path: "/playground", element: <Playground /> },
      {
        path: "/organizers",
        element: <AppLayout />,
        children: [
          {
            path: "",
            element: (
              <UserTable
                users={sampleOrganizers}
                onEdit={(user) => user}
                onDelete={(user) => user}
              />
            ),
          },
        ],
      },
      {
        path: "/participants",
        element: <AppLayout />,
        children: [
          {
            path: "",
            element: (
              <UserTable
                users={sampleParticipants}
                onEdit={(user) => user}
                onDelete={(user) => user}
              />
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
