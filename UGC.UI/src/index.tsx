import { createRoot } from "react-dom/client";
import ConfigProvider from "./themes/context/ConfigContext";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <ConfigProvider>
    <App />
  </ConfigProvider>
);
