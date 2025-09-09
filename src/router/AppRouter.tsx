import { BrowserRouter, Routes, Route } from "react-router-dom";
import Playground from "@/pages/Playground";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/playground" element={<Playground />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
