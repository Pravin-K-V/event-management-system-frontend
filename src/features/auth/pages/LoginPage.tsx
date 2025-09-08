import AuthLayout from "../../../layouts/AuthLayout";
import LoginForm from "../../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout title="Event Manager" tagline="Manage your events with ease">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <LoginForm />
        <p className="text-sm mt-4 text-center">
          New user?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
