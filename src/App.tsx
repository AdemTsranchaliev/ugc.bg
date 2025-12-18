import { Outlet } from "react-router";
import Layout from "./layout";
import ThemeCustomization from "./themes/ThemeCustomization";
import ConfigProvider from "./themes/context/ConfigContext";

const App = () => {
  return (
    <ConfigProvider>
      <ThemeCustomization>
        <Layout />
        <Outlet />
      </ThemeCustomization>
    </ConfigProvider>
  );
};

export default App;
