// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"changelog.mdx": () => import("../content/react/changelog.mdx?collection=docs"), "components/index.mdx": () => import("../content/react/components/index.mdx?collection=docs"), "start/dark-mode.mdx": () => import("../content/react/start/dark-mode.mdx?collection=docs"), "start/design-principles.mdx": () => import("../content/react/start/design-principles.mdx?collection=docs"), "start/frameworks.mdx": () => import("../content/react/start/frameworks.mdx?collection=docs"), "start/index.mdx": () => import("../content/react/start/index.mdx?collection=docs"), "start/quick-start.mdx": () => import("../content/react/start/quick-start.mdx?collection=docs"), "start/standalone-css.mdx": () => import("../content/react/start/standalone-css.mdx?collection=docs"), "start/styling.mdx": () => import("../content/react/start/styling.mdx?collection=docs"), "start/theming.mdx": () => import("../content/react/start/theming.mdx?collection=docs"), "start/tokens.mdx": () => import("../content/react/start/tokens.mdx?collection=docs"), "components/(buttons)/button-group.mdx": () => import("../content/react/components/(buttons)/button-group.mdx?collection=docs"), "components/(buttons)/button.mdx": () => import("../content/react/components/(buttons)/button.mdx?collection=docs"), "components/(typography)/text.mdx": () => import("../content/react/components/(typography)/text.mdx?collection=docs"), "components/(inputs)/checkbox.mdx": () => import("../content/react/components/(inputs)/checkbox.mdx?collection=docs"), "components/(inputs)/input-field.mdx": () => import("../content/react/components/(inputs)/input-field.mdx?collection=docs"), "components/(inputs)/textarea.mdx": () => import("../content/react/components/(inputs)/textarea.mdx?collection=docs"), }),
};
export default browserCollections;