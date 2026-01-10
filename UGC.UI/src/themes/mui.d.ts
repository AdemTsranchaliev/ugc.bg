import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    commonAvatar: React.CSSProperties;
    mediumAvatar: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    commonAvatar?: React.CSSProperties;
    mediumAvatar?: React.CSSProperties;
  }

  interface Palette {
    dark: Palette["primary"];
  }

  interface PaletteOptions {
    dark?: PaletteOptions["primary"];
  }
}
