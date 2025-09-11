import { BrowserRouter, Routes, Route } from "react-router-dom";
import Playground from "@/pages/Playground";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/playground" element={<Playground />} />
        <Route path="*" element={<div>Page not found</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
