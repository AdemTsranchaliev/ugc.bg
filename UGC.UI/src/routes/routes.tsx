import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

import { Layout } from "../layout";
import { AppErrorBoundary } from "../views/ErrorBoundary";
import Loader from "../ui-component/Loader";

// Lazy load route components for code splitting
const HomePage = lazy(() => import("../views/Home").then(module => ({ default: module.HomePage })));
const Explore = lazy(() => import("../views/Explore").then(module => ({ default: module.Explore })));
const AuthPage = lazy(() => import("../views/Auth").then(module => ({ default: module.AuthPage })));
const ForgotPasswordPage = lazy(() => import("../views/Auth").then(module => ({ default: module.ForgotPasswordPage })));
const VerifyEmailPage = lazy(() => import("../views/Auth").then(module => ({ default: module.VerifyEmailPage })));
const CreatorDashboardPage = lazy(() => import("../views/Creator").then(module => ({ default: module.CreatorDashboardPage })));
const CreatorSettingsPage = lazy(() => import("../views/Creator").then(module => ({ default: module.CreatorSettingsPage })));
const PublicProfilePage = lazy(() => import("../views/Profile").then(module => ({ default: module.PublicProfilePage })));
const NotFound = lazy(() => import("../views/Maintenance").then(module => ({ default: module.NotFound })));

// Wrapper component to add Suspense boundary
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>
    {children}
  </Suspense>
);

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <AppErrorBoundary />,
    children: [
      {
        path: "/",
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        )
      },
      {
        path: "/explore",
        element: (
          <SuspenseWrapper>
            <Explore />
          </SuspenseWrapper>
        )
      },
      {
        path: "/auth",
        element: (
          <SuspenseWrapper>
            <AuthPage />
          </SuspenseWrapper>
        )
      },
      {
        path: "/forgot-password",
        element: (
          <SuspenseWrapper>
            <ForgotPasswordPage />
          </SuspenseWrapper>
        )
      },
      {
        path: "/auth/verify-email",
        element: (
          <SuspenseWrapper>
            <VerifyEmailPage />
          </SuspenseWrapper>
        )
      },
      {
        path: "/creator/dashboard",
        element: (
          <SuspenseWrapper>
            <CreatorDashboardPage />
          </SuspenseWrapper>
        )
      },
      {
        path: "/creator/settings",
        element: (
          <SuspenseWrapper>
            <CreatorSettingsPage />
          </SuspenseWrapper>
        )
      },
      {
        path: "/@:handle",
        element: (
          <SuspenseWrapper>
            <PublicProfilePage />
          </SuspenseWrapper>
        )
      },
      {
        path: "*",
        element: (
          <SuspenseWrapper>
            <NotFound />
          </SuspenseWrapper>
        )
      },
    ],
  },
]);

export default routes;
