import AuthLayout from "../../../layouts/AuthLayout";
import SignupForm from "../../../components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Event Manager"
      tagline="Organize, Book, and Manage seamlessly"
    >
      <div>
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
        <SignupForm />
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
