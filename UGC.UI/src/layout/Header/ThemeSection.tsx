// material-ui
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { useTheme, useColorScheme } from "@mui/material/styles";

// project imports
import { ThemeMode } from "../../themes/config";

// assets
import { IconSun, IconMoon } from "@tabler/icons-react";

export const ThemeSection = () => {
  const theme = useTheme();
  const { mode, setMode } = useColorScheme();

  const handleThemeToggle = () => {
    setMode(mode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK);
  };

  const isDarkMode = mode === ThemeMode.DARK;
  return (
    <Box sx={{ ml: 2 }}>
      <Avatar
        variant="rounded"
        onClick={handleThemeToggle}
        sx={{
          ...theme.typography.commonAvatar,
          ...theme.typography.mediumAvatar,
          transition: "all .2s ease-in-out",
          color: theme.vars.palette.secondary.dark,
          background: theme.vars.palette.secondary.light,
          '&:hover, &[aria-controls="menu-list-grow"]': {
            color: theme.vars.palette.secondary.light,
            background: theme.vars.palette.secondary.dark,
          },
          ...theme.applyStyles("dark", {
            color: theme.vars.palette.secondary.dark,
            background: theme.vars.palette.dark.main,
            '&:hover, &[aria-controls="menu-list-grow"]': {
              color: theme.vars.palette.grey[800],
              background: theme.vars.palette.secondary.dark,
            },
          }),
        }}
      >
        {isDarkMode ? (
          <IconSun stroke={1.5} size="20px" />
        ) : (
          <IconMoon stroke={1.5} size="20px" />
        )}
      </Avatar>
    </Box>
  );
};

export default ThemeSection;
