import { Navigate, Outlet } from "react-router";

type AuthGuardProps = {
  isAllowed: boolean;
  redirectTo?: string;
};

export const AuthGuard = ({
  isAllowed,
  redirectTo = "/login",
}: AuthGuardProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
