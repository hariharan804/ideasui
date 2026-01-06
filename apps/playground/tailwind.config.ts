import type {Config} from "tailwindcss";
import {ideasUIPlugin} from "@ideasui/theme/plugin";

export default {
  plugins: [
    ideasUIPlugin({
      defaultTheme: "light",
      layout: {
        aas: "2",
        radiusSmall: "0.25rem",
        radiusMedium: "0.5rem",
        radiusLarge: "0.75rem",
        borderWidthSmall: "1px",
        borderWidthMedium: "2px",
        borderWidthLarge: "3px",
        boxShadowSmall: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
        boxShadowMedium: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
        boxShadowLarge: "0 8px 16px 0 rgba(0, 0, 0, 0.1)",
        hoverOpacity: "0.8",
        disabledOpacity: "0.5",
        dividerWeight: "1px",
        focusRingWidth: "2px",
        focusRingOffset: "2px",
      },
      themes: {
        light: {
          layout: {
            aas: "3",
          },
          colors: {
            // primary: {
            //   500: "hsla(0, 100%, 37%, 1.00)",
            // },
            // anyColors: {
            //   500: "hsla(0, 100%, 37%, 1.00)", // yellow
            // },
            // white: "#fff",
            // black: "#000",
            danger: {
              500: "",
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
