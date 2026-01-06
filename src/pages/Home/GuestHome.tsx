import { Link } from "react-router-dom";

export default function GuestHome() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <h1 className="text-4xl font-bold text-primary mb-4">
        Evently - An Event Management System
      </h1>
      <p className="text-lg text-text-secondary mb-8 text-center max-w-md">
        A simple platform for organizers, admins, and participants to create,
        manage, and join events with ease.
      </p>

      <div className="flex gap-4">
        <Link
          to="/signup"
          className="rounded-md bg-primary px-6 py-2 font-medium text-white hover:bg-primary-hover"
          viewTransition
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
