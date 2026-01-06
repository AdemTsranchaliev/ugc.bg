import { cloneElement, type ReactElement } from "react";

// material-ui
// import { useTheme } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import AppBar, { type AppBarProps } from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// project imports
import { MenuList } from "./MenuList";
import useConfig from "../../themes/context/useConfig";

type ElevationScrollProps = { children: ReactElement<AppBarProps> };

function ElevationScroll({ children }: ElevationScrollProps) {
  // const theme = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  // theme.shadows[4] = theme.vars.customShadows.z1;

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

// ==============================|| HORIZONTAL MENU LIST ||============================== //

export const HorizontalBar = () => {
  const {
    state: { container },
  } = useConfig();

  return (
    <ElevationScroll>
      <AppBar
        sx={(theme) => ({
          top: 71,
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
        <Container maxWidth={container ? "xl" : false}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MenuList />
          </Box>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};

export default HorizontalBar;
