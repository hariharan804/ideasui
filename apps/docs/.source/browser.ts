// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"components/index.mdx": () => import("../content/react/components/index.mdx?collection=docs"), "getting-started/design-tokens.mdx": () => import("../content/react/getting-started/design-tokens.mdx?collection=docs"), "getting-started/index.mdx": () => import("../content/react/getting-started/index.mdx?collection=docs"), "components/(buttons)/button-group.mdx": () => import("../content/react/components/(buttons)/button-group.mdx?collection=docs"), "components/(buttons)/button.mdx": () => import("../content/react/components/(buttons)/button.mdx?collection=docs"), }),
};
export default browserCollections;