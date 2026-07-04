import fs from 'node:fs/promises';
import path from 'node:path';

import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@ideasui/utils';

import { Code } from './code';
import { getDemo } from '@/showcase';

export interface SourceProperties extends ComponentPropsWithoutRef<'div'> {
  /** The name of the demo to load from the showcase registry */
  name?: string;
  /** Direct inline raw code string to display instead of a registry file */
  code?: string;
  /** The language of the code block (e.g. tsx, css, html) */
  language?: string;
  /** Custom title for the code block */
  title?: string;
  /** Whether to show the code title in the header */
  showCodeTitle?: boolean;
  /** Whether to show line numbers next to code lines */
  showLineNumbers?: boolean;
  /** Whether the code block is collapsible */
  collapsible?: boolean;
  /** Whether to render the code block in isolated style mode */
}

export async function Source({
  className,
  code: directCode,
  collapsible = true,
  language,
  name,
  showCodeTitle = false,
  showLineNumbers = true,
  title,
  ...properties
}: SourceProperties) {
  let code: string | undefined = directCode;

  if (name && !code) {
    const item = getDemo(name);
    const source = item?.file;

    if (source) {
      try {
        code = await fs.readFile(path.join(process.cwd(), 'showcase', source), 'utf8');
      } catch (error) {
        console.error(`[Source] Failed to read file for showcase "${name}":`, error);

        return null;
      }
    }
  }

  if (!code) {
    return null;
  }

  const lang = language ?? title?.split('.').pop() ?? 'tsx';

  return (
    <div className={cn('relative w-full overflow-hidden', className)} {...properties}>
      <Code
        className="m-0 rounded-none border-none shadow-none"
        code={code}
        collapsible={collapsible}
        lang={lang}
        showLineNumbers={showLineNumbers}
        title={showCodeTitle ? title : undefined}
      />
    </div>
  );
}

Source.displayName = 'IdeasUI.Source';
