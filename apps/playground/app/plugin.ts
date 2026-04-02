import type { Config } from 'tailwindcss';

import { ideasUIPlugin } from '@ideasui/theme/plugin';

type Plugin = NonNullable<Config['plugins']>[number];

const plugin: Plugin = ideasUIPlugin();

export default plugin;
