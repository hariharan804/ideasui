import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const { docs, meta } = defineDocs({
  dir: 'content/react',
  docs: {
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      icon: z.string().optional(),
      full: z.boolean().optional(),
      links: z
        .object({
          npm: z.union([z.boolean(), z.string()]).optional(),
          rac: z.string().optional(),
          source: z.string().optional(),
          recipe: z.string().optional(),
          storybook: z.string().optional(),
          figma: z.union([z.boolean(), z.string()]).optional(),
        })
        .optional(),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
    },
  },
});
