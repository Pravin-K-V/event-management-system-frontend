import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { userRole } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import Toast from "@/components/ui/Toast";

interface RoleBasedRouteProps {
  allowedRoles: userRole[];
}

export default function RoleBasedRoute({ allowedRoles }: RoleBasedRouteProps) {
  const { user, isLoggedIn } = useAuth();
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (user && !allowedRoles.includes(user.role!)) {
      setShowToast(true); // ✅ Only triggers once on mount
    }
  }, [user, allowedRoles]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!user || !allowedRoles.includes(user.role!)) {
    return (
      <>
        {showToast && (
          <Toast
            message="You don’t have permission to access this page."
            onClose={() => setShowToast(false)}
          />
        )}
        <Navigate to="/dashboard" replace />
      </>
    );
  }

  return <Outlet />;
}
