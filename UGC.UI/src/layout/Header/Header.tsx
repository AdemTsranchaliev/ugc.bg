import { Activity } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

// project imports
import LogoSection from "./LogoSection";
import MobileSection from "./MobileSection";
import ProfileSection from "./ProfileSection";
import NotificationSection from "./NotificationSection";
import { MenuList } from "../Navigation/MenuList";

// assets
import { IconMenu2 } from "@tabler/icons-react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Stack } from "@mui/material";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

export default function Header() {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      enableColorOnDark
      sx={{ bgcolor: "background.default" }}
    >
      <Toolbar sx={{ p: 1.25 }}>
        {/* Logo & Toggler button */}
        <Box sx={{ display: "flex" }}>
          <Box>
            <Box
              component="span"
              sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
            >
              <LogoSection />
            </Box>

            {/* Mobile Menu */}
            <Activity mode={downMD ? "visible" : "hidden"}>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.mediumAvatar,
                  overflow: "hidden",
                  transition: "all .2s ease-in-out",
                  color: theme.vars.palette.secondary.dark,
                  background: theme.vars.palette.secondary.light,
                  "&:hover": {
                    color: theme.vars.palette.secondary.light,
                    background: theme.vars.palette.secondary.dark,
                  },
                  ...theme.applyStyles("dark", {
                    color: theme.vars.palette.secondary.main,
                    background: theme.vars.palette.dark.main,
                    "&:hover": {
                      color: theme.vars.palette.secondary.light,
                      background: theme.vars.palette.secondary.main,
                    },
                  }),
                }}
              >
                <IconMenu2 stroke={1.5} size="20px" />
              </Avatar>
            </Activity>
          </Box>
        </Box>

        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Stack
            direction="row"
            sx={{ mx: 2 }}
          >
            {/* Horizontal Menu */}
            <MenuList />
          </Stack>
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Notification */}
        <NotificationSection />

        {/* Profile */}
        <ProfileSection />

        {/* Mobile quick menu */}
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <MobileSection />
        </Box>
      </Toolbar>
    </AppBar >
  );
}
