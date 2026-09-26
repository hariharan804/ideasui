// @ts-nocheck
import { default as __fd_glob_20 } from "../content/react/start/meta.json?collection=meta"
import { default as __fd_glob_19 } from "../content/react/components/meta.json?collection=meta"
import { default as __fd_glob_18 } from "../content/react/meta.json?collection=meta"
import * as __fd_glob_17 from "../content/react/components/(inputs)/textarea.mdx?collection=docs"
import * as __fd_glob_16 from "../content/react/components/(inputs)/radio.mdx?collection=docs"
import * as __fd_glob_15 from "../content/react/components/(inputs)/input-field.mdx?collection=docs"
import * as __fd_glob_14 from "../content/react/components/(inputs)/checkbox.mdx?collection=docs"
import * as __fd_glob_13 from "../content/react/components/(typography)/text.mdx?collection=docs"
import * as __fd_glob_12 from "../content/react/components/(buttons)/button.mdx?collection=docs"
import * as __fd_glob_11 from "../content/react/components/(buttons)/button-group.mdx?collection=docs"
import * as __fd_glob_10 from "../content/react/start/tokens.mdx?collection=docs"
import * as __fd_glob_9 from "../content/react/start/theming.mdx?collection=docs"
import * as __fd_glob_8 from "../content/react/start/styling.mdx?collection=docs"
import * as __fd_glob_7 from "../content/react/start/standalone-css.mdx?collection=docs"
import * as __fd_glob_6 from "../content/react/start/quick-start.mdx?collection=docs"
import * as __fd_glob_5 from "../content/react/start/index.mdx?collection=docs"
import * as __fd_glob_4 from "../content/react/start/frameworks.mdx?collection=docs"
import * as __fd_glob_3 from "../content/react/start/design-principles.mdx?collection=docs"
import * as __fd_glob_2 from "../content/react/start/dark-mode.mdx?collection=docs"
import * as __fd_glob_1 from "../content/react/components/index.mdx?collection=docs"
import * as __fd_glob_0 from "../content/react/changelog.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.doc("docs", "content/react", {"changelog.mdx": __fd_glob_0, "components/index.mdx": __fd_glob_1, "start/dark-mode.mdx": __fd_glob_2, "start/design-principles.mdx": __fd_glob_3, "start/frameworks.mdx": __fd_glob_4, "start/index.mdx": __fd_glob_5, "start/quick-start.mdx": __fd_glob_6, "start/standalone-css.mdx": __fd_glob_7, "start/styling.mdx": __fd_glob_8, "start/theming.mdx": __fd_glob_9, "start/tokens.mdx": __fd_glob_10, "components/(buttons)/button-group.mdx": __fd_glob_11, "components/(buttons)/button.mdx": __fd_glob_12, "components/(typography)/text.mdx": __fd_glob_13, "components/(inputs)/checkbox.mdx": __fd_glob_14, "components/(inputs)/input-field.mdx": __fd_glob_15, "components/(inputs)/radio.mdx": __fd_glob_16, "components/(inputs)/textarea.mdx": __fd_glob_17, });

export const meta = await create.meta("meta", "content/react", {"meta.json": __fd_glob_18, "components/meta.json": __fd_glob_19, "start/meta.json": __fd_glob_20, });