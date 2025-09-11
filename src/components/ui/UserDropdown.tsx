import { useState } from "react";
import { Link } from "react-router-dom";

interface User {
  name: string;
  avatarUrl?: string;
  role: "organizer" | "user";
}

interface UserDropdownProps {
  user: User;
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    alert("Logout clicked!");
    setIsOpen(false);
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={toggleDropDown}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-white focus:outline-none"
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </button>
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-40 bg-card shadow-lg rounded-md overflow-hidden z-50">
          <li>
            <Link
              to="/profile"
              className="block px-4 py-2 text-text-primary hover:bg-background"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </Link>
          </li>
          <li>
            <button
              className="w-full text-left px-4 py-2 text-text-primary hover:bg-background"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
