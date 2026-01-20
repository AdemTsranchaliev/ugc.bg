export const HORIZONTAL_MAX_ITEM = 7;
export const CSS_VAR_PREFIX = "";
export let ThemeMode;

(function (ThemeMode) {
  ThemeMode["LIGHT"] = "light";
  ThemeMode["DARK"] = "dark";
  ThemeMode["SYSTEM"] = "system";
})(ThemeMode || (ThemeMode = {}));

export const DEFAULT_THEME_MODE = ThemeMode.LIGHT;

const config = {
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 8,
  outlinedFilled: true,
  presetColor: "default",
  i18n: "en",
  container: "xl",
};

export default config;
