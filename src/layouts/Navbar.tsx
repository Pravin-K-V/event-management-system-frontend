import { useState } from "react";
import { NavLink } from "react-router-dom";
import UserDropdown from "@/components/ui/UserDropdown";
import {
  ROLE_BASED_LINKS,
  type NavLink as NavLinkType,
} from "@/constants/navLinks";

interface User {
  name: string;
  avatarUrl?: string;
  role: "organizer" | "user";
}

interface NavbarProps {
  variant: "landing" | "app";
  user?: User | null;
  links?: NavLinkType;
}

export default function Navbar({
  variant = "landing",
  user,
  links,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinksArray = Array.isArray(links)
    ? links
    : links
      ? [links]
      : user
        ? ROLE_BASED_LINKS[user.role]
        : [];
  return (
    <nav className="bg-card shadow-md px-4 py-2">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-primary font-bold text-xl">
          Evently
        </NavLink>

        {variant === "landing" && (
          <div className="flex gap-2">
            <NavLink
              to="/login"
              className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-hover transition"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="px-4 py-2 rounded bg-secondary text-white hover:bg-secondary-hover transition"
            >
              Sign Up
            </NavLink>
          </div>
        )}
        {variant === "app" && user && (
          <>
            <ul className="hidden md:flex gap-4">
              {navLinksArray.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-text-primary hover:text-primary transition ${isActive ? "font-bold" : ""}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="ml-4">
              <UserDropdown user={user} />
            </div>

            <button
              className="md:hidden ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </button>
          </>
        )}
      </div>
      {variant === "app" && isMobileMenuOpen && (
        <ul className="md:hidden mt-2 flex flex-col gap-2">
          {navLinksArray.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className="block px-4 py-2 text-text-primary hover:bg-background rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
