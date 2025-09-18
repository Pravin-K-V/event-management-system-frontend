import AuthLayout from "@/layouts/AuthLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "@/components/ui/PasswordInput";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-2xl font-bold text-text-primary text-center mb-6">
          Login
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            name="password"
            required
          />

          {error && <p className="text-error">{error}</p>}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <p className="mt-6 text-sm text-text-secondary text-center">
          New user?{" "}
          <Link
            to="/signup"
            className="text-primary hover:text-primary-hover font-medium"
            viewTransition
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
