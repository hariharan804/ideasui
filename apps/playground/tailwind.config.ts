import type {Config} from "tailwindcss";
import {ideasUIPlugin} from "@ideasui/theme/plugin";

export default {
  plugins: [
    ideasUIPlugin({
      defaultTheme: "light",
      themes: {
        light: {
          layout: {},
          colors: {
            primary: {
              500: "oklch(0 0 0)",
            },
          },
        },
        summar: {
          colors: {
            primary: {
              500: "oklch(8.18 40.1 21)", // yellow
            },
          },
        },
      },
    }) as unknown as Config,
  ],
} as Config;
