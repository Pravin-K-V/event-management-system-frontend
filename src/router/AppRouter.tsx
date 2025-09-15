import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Playground from "@/pages/Playground";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import GuestHome from "@/pages/Home/GuestHome";
import { useAuth } from "@/hooks/useAuth";
import EventListingPage from "@/pages/events/EventListingPage";
import CreateEventPage from "@/features/events/pages/CreateEventPage";
import EditEventPage from "@/features/events/pages/EditEventPage";
import AppLayout from "@/layouts/AppLayout";

function RootRouter() {
  const { user } = useAuth();

  if (!user) return <GuestHome />;

  return <Navigate to="/dashboard" replace />;
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
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard",
        element: <EventListingPage />,
      },
      {
        path: "/events",
        element: <EventListingPage />,
      },
      {
        path: "/events/create",
        element: <CreateEventPage />,
      },
      {
        path: "/events/:id/edit",
        element: <EditEventPage />,
      },
      {
        path: "/playground",
        element: <Playground />,
      },
      {
        path: "*",
        element: <div>Page not found</div>,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
