import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
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

function RootRouter() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <GuestHome />;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRouter />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/dashboard",
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
      { path: "/playground", element: <Playground /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
