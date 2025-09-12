import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Playground from "@/pages/Playground";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import GuestHome from "@/pages/Home/GuestHome";
import Dashboard from "@/pages/Dashboard";
import { useAuth } from "@/hooks/userAuth";

function RootRouter() {
  const { user } = useAuth();

  if (!user) return <GuestHome />;
  return <Dashboard />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRouter />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/playground",
    element: <Playground />,
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
    path: "*",
    element: <div>Page not found</div>,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
