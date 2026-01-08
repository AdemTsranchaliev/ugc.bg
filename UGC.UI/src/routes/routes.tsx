import { createBrowserRouter } from "react-router";

import { Layout } from "../layout";
import { HomePage } from "../views/Home";
import { Explore } from "../views/Explore";

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/explore", element: <Explore /> },
    ],
  },
]);

export default routes;
