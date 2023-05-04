import { Theme } from "@emotion/react";
import { mainTheme, purple } from "./main";

interface ThemeElement {
  name: string;
  theme: Theme;
  isDark: boolean;
}

export const themes: ThemeElement[] = [
  {
    name: "Default",
    theme: mainTheme,
    isDark: true,
  },
];
