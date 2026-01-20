import { cloneElement, type ReactElement } from "react";

// material-ui
import useScrollTrigger from "@mui/material/useScrollTrigger";
import AppBar, { type AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";

// project imports
import { MenuList } from "./MenuList";

type ElevationScrollProps = { children: ReactElement<AppBarProps> };

function ElevationScroll({ children }: ElevationScrollProps) {

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}


export const HorizontalBar = () => {

  return (
    <ElevationScroll>
      <AppBar
        sx={(theme) => ({
          top: 66,
          display: { xs: "none", md: "block" },
          bgcolor: "background.paper",
          width: "100%",
          height: 62,
          justifyContent: "center",
          borderTop: "1px solid",
          borderColor: "grey.300",
          zIndex: 1098,
          ...theme.applyStyles("dark", {
            bgcolor: "background.default",
            borderColor: "background.paper",
          }),
        })}
      >
        <Box sx={{ display: "flex", alignItems: "center", px: 2 }}>
          <MenuList />
        </Box>
      </AppBar>
    </ElevationScroll>
  );
};

export default HorizontalBar;
