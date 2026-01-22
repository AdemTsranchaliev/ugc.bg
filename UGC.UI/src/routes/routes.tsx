import { createBrowserRouter } from "react-router";

import { Layout } from "../layout";
import { AppErrorBoundary } from "../views/ErrorBoundary";
import { HomePage } from "../views/Home";
import { AuthPage, ForgotPasswordPage, VerifyEmailPage } from "../views/Auth";
import { PublicProfilePage } from "../views/Profile";
import { CreatorDashboardPage, CreatorSettingsPage } from "../views/Creator";
import { Explore } from "../views/Explore";
import { NotFound } from "../views/Maintenance";

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <AppErrorBoundary />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/explore", element: <Explore /> },
      { path: "/auth", element: <AuthPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/auth/verify-email", element: <VerifyEmailPage /> },
      { path: "/creator/dashboard", element: <CreatorDashboardPage /> },
      { path: "/creator/settings", element: <CreatorSettingsPage /> },
      { path: "/@:handle", element: <PublicProfilePage /> },

      // { path: "*", element: <UnderConstruction /> },
      // { path: "*", element: <ServerError /> },
      // { path: "*", element: <ComingSoon /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default routes;
