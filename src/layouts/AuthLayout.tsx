import type React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 bg-primary text-white flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold mb-4">Evently</h1>
        <p className="text-lg text-gray-200 text-center max-w-md">
          {" "}
          Manage your events, track users, and analyze reports efficiently with
          our platform.
        </p>
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center bg-card">
        <div className="w-full max-w-md p-8">{children}</div>
      </div>
    </div>
  );
}
