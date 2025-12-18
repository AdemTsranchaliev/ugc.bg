import { createContext, useMemo } from "react";

// project imports
import config from "../config";
import { useLocalStorage } from "../../utils/useLocalStorage";

// ==============================|| CONFIG CONTEXT ||============================== //

export const ConfigContext = createContext(undefined);

// ==============================|| CONFIG PROVIDER ||============================== //

export const ConfigProvider = ({ children }) => {
  const { state, setState, setField, resetState } = useLocalStorage(
    "ugc-config",
    config
  );

  const memoizedValue = useMemo(
    () => ({ state, setState, setField, resetState }),
    [state, setField, setState, resetState]
  );

  return (
    <ConfigContext.Provider value={memoizedValue}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
