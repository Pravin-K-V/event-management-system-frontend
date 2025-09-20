import type { userRole } from "@/context/AuthContext";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Modal from "./Modal";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  role: userRole;
  userName: string | undefined;
  onLogout: () => void;
}

const navConfig: Record<userRole, { label: string; to: string }[]> = {
  admin: [
    { label: "Events", to: "/events" },
    { label: "Participants", to: "/participants" },
    { label: "Organizers", to: "/organizers" },
  ],
  organizer: [
    { label: "My Events", to: "/my-events" },
    { label: "Registrations", to: "/registrations" },
  ],
  participant: [
    { label: "Explore Events", to: "/events" },
    { label: "Registered Events", to: "/registered-events" },
  ],
};

export default function Navbar({ role, userName, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 h-16 backdrop-blur-md shadow-lg bg-card/80 z-50">
        <div className="h-full px-8 flex items-center">
          <Link to="/dashboard" className="text-primary font-bold text-2xl">
            Evently
          </Link>

          <div className="ml-auto flex items-center space-x-6">
            {navConfig[role].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `transition-colors ${isActive ? "text-primary" : "text-text-primary hover:text-primary"}`
                }
                viewTransition
              >
                {link.label}
              </NavLink>
            ))}

            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-12 w-12 text-lg cursor-pointer transition flex items-center justify-center rounded-full text-white bg-primary font-bold overflow-hidden"
              >
                {initials}
              </button>

              {isOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-card rounded-md shadow-lg overflow-hidden">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-text-primary hover:bg-background transition-colors"
                      onClick={() => setIsOpen(false)}
                      viewTransition
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className="cursor-pointer w-full text-left px-4 py-2 text-text-primary hover:bg-background transition-colors"
                      onClick={() => {
                        setIsOpen(false);
                        setShowLogoutModal(true);
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Modal
        isOpen={showLogoutModal}
        title="Logout"
        onClose={() => setShowLogoutModal(false)}
      >
        <p className="text-text-secondary mb-4">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onLogout();
              setShowLogoutModal(false);
              setIsOpen(false);
            }}
          >
            Logout
          </Button>
        </div>
      </Modal>
    </>
  );
}
