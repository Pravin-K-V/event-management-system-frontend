import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  tagline: string;
}

export default function AuthLayout({
  children,
  title,
  tagline,
}: AuthLayoutProps) {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center bg-blue-600 text-white p-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg">{tagline}</p>
      </div>

      {/* Right side */}
      <div className="flex justify-center items-center bg-gray-50 p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
