import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import AuthLayout from "@/layouts/AuthLayout";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import type { userRole } from "@/context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<userRole>("participant");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signup({ fullName, email, phone, password, role });
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
          Sign Up
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            value={fullName}
            type="text"
            placeholder="Full Name"
            name="fullName"
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input
            value={email}
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            value={phone}
            type="tel"
            placeholder="Phone Number"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Input
            value={password}
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            value={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as userRole)}
            className="p-2 border rounded"
          >
            <option value="participant">Participant</option>
            <option value="organizer">Organizer</option>
            <option value="admin">Admin</option>
          </select>

          {error && <p className="text-error">{error}</p>}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        <p className="text-sm mt-6 text-text-primary text-center">
          Already a user?{" "}
          <Link
            to="/login"
            className="text-primary hover:text-primary-hover font-medium"
            viewTransition
          >
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
