import { useMemo, type ReactNode } from "react";

// material-ui
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// project imports
import { CSS_VAR_PREFIX, DEFAULT_THEME_MODE, ThemeMode } from "./config";
import CustomShadows from "./custom-shadows";
import useConfig from "./context/useConfig";
import { buildPalette } from "./palette";
import Typography from "./typography";
import componentsOverrides from "./overrides";

// ==============================|| DEFAULT THEME - MAIN ||============================== //

type ThemeCustomizationProps = {
  children: ReactNode;
};

export const ThemeCustomization: React.FC<ThemeCustomizationProps> = ({
  children,
}) => {
  const {
    state: {
      borderRadius,
      fontFamily,
      outlinedFilled,
      presetColor,
      // themeDirection,
    },
  } = useConfig();

  const palette = useMemo(() => buildPalette(presetColor), [presetColor]);

  const themeTypography = useMemo(() => Typography(fontFamily), [fontFamily]);

  const themeOptions = useMemo(
    () => ({
      // direction: themeDirection,
      mixins: {
        toolbar: {
          minHeight: "48px",
          padding: "16px",
          "@media (min-width: 600px)": {
            minHeight: "48px",
          },
        },
      },
      typography: themeTypography,
      colorSchemes: {
        light: {
          palette: palette.light,
          customShadows: CustomShadows(palette.light, ThemeMode.LIGHT),
        },
        dark: {
          palette: palette.dark,
          customShadows: CustomShadows(palette.dark, ThemeMode.DARK),
        },
      },
      cssVariables: {
        cssVarPrefix: CSS_VAR_PREFIX,
        colorSchemeSelector: "data-color-scheme",
      },
    }),
    [themeTypography, palette]
  );

  const themes = createTheme(themeOptions);
  themes.components = useMemo(
    () => componentsOverrides(themes, borderRadius, outlinedFilled),
    [themes, borderRadius, outlinedFilled]
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider
        disableTransitionOnChange
        theme={themes}
        modeStorageKey="theme-mode"
        defaultMode={DEFAULT_THEME_MODE}
      >
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeCustomization;
