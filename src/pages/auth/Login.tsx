import AuthLayout from "@/layouts/AuthLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <AuthLayout>
      <div>
        <h2 className="text-2xl font-bold text-text-primary text-center mb-6">
          Login
        </h2>

        <form className="flex flex-col gap-4">
          <Input type="email" placeholder="Email" name="email" required />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
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
