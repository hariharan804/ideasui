import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { loader } from 'fumadocs-core/source';

import { docs, meta } from '../.source/server';

export const source = loader({
  baseUrl: '/react/docs',
  source: toFumadocsSource(docs, meta),
});

export const reactPageTree = source.pageTree;
