import { use } from "react";
import { ConfigContext } from "./ConfigContext";

// ==============================|| CONFIG - HOOKS ||============================== //

export const useConfig = () => {
  const context = use(ConfigContext);

  if (!context) throw new Error("useConfig must be use inside ConfigProvider");

  return context;
};

export default useConfig;
