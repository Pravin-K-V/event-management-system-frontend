import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Playground from "@/pages/Playground";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";

const router = createBrowserRouter([
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
