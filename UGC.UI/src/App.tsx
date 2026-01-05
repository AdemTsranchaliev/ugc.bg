import ThemeCustomization from "./themes/ThemeCustomization";
import { RouterProvider } from "react-router";
import { routes } from "./routes";

const App = () => {
  return (
    <ThemeCustomization>
      <RouterProvider router={routes} />
    </ThemeCustomization>
  );
};

export default App;
