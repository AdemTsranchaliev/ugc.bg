import { Outlet } from "react-router";
import { HorizontalBar } from "./layout/navigation";
import ThemeCustomization from "./themes/ThemeCustomization";
import ConfigProvider from "./themes/context/ConfigContext";

const App = () => {
  return (
    <ConfigProvider>
      <ThemeCustomization>
        <HorizontalBar />
        <Outlet />
      </ThemeCustomization>
    </ConfigProvider>
  );
};

export default App;
