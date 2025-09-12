import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import AuthLayout from "@/layouts/AuthLayout";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <AuthLayout>
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
          Sign Up
        </h2>

        <form className="flex flex-col gap-4">
          <Input type="text" placeholder="Full Name" name="fullName" required />
          <Input type="email" placeholder="Email" name="email" required />
          <Input type="tel" placeholder="Phone Number" name="phone" required />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
          />
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
