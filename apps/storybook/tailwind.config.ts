import type { Config } from 'tailwindcss';

import { ideasUIPlugin } from '@ideasui/theme/plugin';

const config: Config = {
  content: [
    './.storybook/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/**/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/**/stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    ideasUIPlugin({
      defaultTheme: 'light',
      // designTokens: {
      //   spacing: {
      //     cus: '10px',
      //   },
      // },
      // components: {
      //   button: {
      //     base: {
      //       backgroundColor: 'blue',
      //     },
      //   },
      // },
      // // disableAnimations: true,
      // semanticTokens: {
      //   content: {
      //     cus: 'green',
      //     'on-cus': 'yellow',
      //   },
      // },
      // themes: {
      //   light: {
      //     designTokens: {
      //       spacing: {
      //         // cus: '30px',
      //       },
      //       boxShadow: {
      //         cus: '0 0 0 1px red',
      //       },
      //       animation: {
      //         cus: 'spin 1s linear infinite',
      //       },
      //       blur: {
      //         cus: 'blur(10px)',
      //       },
      //       borderRadius: {
      //         cus: '5px',
      //       },
      //       borderColor: {
      //         cus: 'red',
      //       },
      //       borderWidth: {
      //         cus: '1px',
      //       },
      //       duration: {
      //         cus: '1s',
      //       },
      //       fontFamily: {
      //         cus: 'Arial',
      //       },
      //       fontSize: {
      //         cus: '12px',
      //       },
      //       fontWeight: {
      //         cus: 'bold',
      //       },
      //       easing: {
      //         cus: 'ease-in-out',
      //       },
      //       keyframes: {
      //         cus: {
      //           '0%': {
      //             transform: 'rotate(0deg)',
      //           },
      //           '100%': {
      //             transform: 'rotate(360deg)',
      //           },
      //         },
      //       },
      //       opacity: {
      //         cus: '0.5',
      //       },
      //       zIndex: {
      //         cus: '100',
      //       },
      //       letterSpacing: {
      //         cus: '1px',
      //       },
      //     },
      //     semanticTokens: {
      //       border: {
      //         cus: 'red',
      //       },
      //       content: {
      //         // cus: 'red',
      //         // 'on-cus': 'blue',
      //       },
      //       surface: {
      //         cus: 'red',
      //         'on-cus': 'blue',
      //       },
      //     },
      //     components: {
      //       button: {
      //         base: {
      //           // backgroundColor: 'red',
      //         },
      //       },
      //     },
      //     colors: {
      //       btn: '#228880',
      //       primary: {
      //         '500': '#093333',
      //         '550': '#090444',
      //       },
      //     },
      //   },
      // },
    }),
  ],
};

export default config;
