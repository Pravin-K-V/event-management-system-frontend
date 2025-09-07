import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

type Props = {
  onSubmit: (data: { email: string; password: string }) => void;
};

export const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) return setError("Please enter your email");
    if (!password) return setError("Please enter your password");
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        {/* If you created Input component, use it. Otherwise, native input below */}
        {typeof Input === "function" ? (
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
          />
        ) : (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="you@example.com"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        {typeof Input === "function" ? (
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            type="password"
          />
        ) : (
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Your password"
          />
        )}
      </div>

      {error && <div className="text-error text-sm">{error}</div>}

      <div className="flex justify-end">
        <Button type="submit" variant="primary">
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
