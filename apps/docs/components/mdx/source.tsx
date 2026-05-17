/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
import fs from 'node:fs/promises';
import path from 'node:path';

import * as React from 'react';
import { cn } from '@ideasui/utils';

import { Code } from './code';

import { getDemo } from '@/demos';

export async function Source({
  className,
  collapsible = true,
  language,
  name,
  showCodeTitle = false,
  showLineNumbers = true,
  title,
}: React.ComponentProps<'div'> & {
  name?: string;
  title?: string;
  language?: string;
  showCodeTitle?: boolean;
  showLineNumbers?: boolean;
  collapsible?: boolean;
}) {
  if (!name) {
    return null;
  }

  let src: string | undefined;
  let code: string | undefined;

  const item = getDemo(name);

  src = item?.file;

  if (src) {
    try {
      code = await fs.readFile(path.join(process.cwd(), 'demos', src), 'utf-8');
    } catch (error) {
      return null;
    }
  }

  if (!code) {
    return null;
  }

  const lang = language ?? title?.split('.').pop() ?? 'tsx';

  return (
    <div className={cn('relative', className)}>
      <Code
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
