import { useNavigate } from "react-router-dom";
import NotFoundIllustration from "@/assets/images/404.svg";
import Button from "@/components/ui/Button";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-background items-center justify-center min-h-screen px-4 text-center">
      <img
        src={NotFoundIllustration}
        alt="Page not found"
        className="w-full max-w-md mb-8"
      />
      <h1 className="text-4xl font-bold text-text-primary mb-4">
        Page Not Found
      </h1>
      <p className="text-text-secondary mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button onClick={() => navigate("/")} type="button">
        <Home className="w-5 h-5 mr-2" />
        Go Home
      </Button>
    </div>
  );
}
