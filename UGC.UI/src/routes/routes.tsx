import { createBrowserRouter } from "react-router";

import { Layout } from "../layout";
import { AppErrorBoundary } from "../views/ErrorBoundary";
import { HomePage } from "../views/Home";
import { Explore } from "../views/Explore";
import { ComingSoon, NotFound, ServerError, UnderConstruction } from "../views/Maintenance";

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <AppErrorBoundary />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/explore", element: <Explore /> },

      // { path: "*", element: <UnderConstruction /> },
      // { path: "*", element: <ServerError /> },
      // { path: "*", element: <ComingSoon /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default routes;
