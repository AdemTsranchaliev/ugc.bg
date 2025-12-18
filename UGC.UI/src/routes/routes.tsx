import { createBrowserRouter } from "react-router";
import App from "../App";
import { F1, F2, F3 } from "../features";

export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <F1 /> },
      { path: "/asd", element: <F2 /> },
      { path: "/55", element: <F3 /> },
    ],
  },
]);

export default routes;
