// @ts-nocheck
import { default as __fd_glob_7 } from "../content/react/getting-started/meta.json?collection=meta"
import { default as __fd_glob_6 } from "../content/react/components/meta.json?collection=meta"
import { default as __fd_glob_5 } from "../content/react/meta.json?collection=meta"
import * as __fd_glob_4 from "../content/react/components/(buttons)/button.mdx?collection=docs"
import * as __fd_glob_3 from "../content/react/components/(buttons)/button-group.mdx?collection=docs"
import * as __fd_glob_2 from "../content/react/getting-started/index.mdx?collection=docs"
import * as __fd_glob_1 from "../content/react/getting-started/design-tokens.mdx?collection=docs"
import * as __fd_glob_0 from "../content/react/components/index.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.doc("docs", "content/react", {"components/index.mdx": __fd_glob_0, "getting-started/design-tokens.mdx": __fd_glob_1, "getting-started/index.mdx": __fd_glob_2, "components/(buttons)/button-group.mdx": __fd_glob_3, "components/(buttons)/button.mdx": __fd_glob_4, });

export const meta = await create.meta("meta", "content/react", {"meta.json": __fd_glob_5, "components/meta.json": __fd_glob_6, "getting-started/meta.json": __fd_glob_7, });