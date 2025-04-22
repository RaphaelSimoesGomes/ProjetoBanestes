
import { Navigate } from "react-router-dom";

type Props = {
  allowedRoles: string[];
  children: React.ReactNode;
};

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return <Navigate to="/auth/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/auth/login" replace />;
  return <>{children}</>;
}
