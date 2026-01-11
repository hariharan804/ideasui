import type { Config } from 'tailwindcss';

import { ideasUIPlugin } from '@ideasui/theme';

export default ideasUIPlugin({
  defaultTheme: 'light',
}) as unknown as Config;
