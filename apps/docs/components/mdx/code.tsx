import type { CodeBlockProps } from 'fumadocs-ui/components/codeblock';

import { highlight } from 'fumadocs-core/highlight';
import * as Base from 'fumadocs-ui/components/codeblock';

import { CodeBlock as CodeBlockClient } from './codeblock-client';

const EMPTY_CODE_BLOCK = (
  <Base.Pre>
    <code />
  </Base.Pre>
);

function HighlightPre(props: React.ComponentPropsWithoutRef<typeof Base.Pre>) {
  return <Base.Pre {...props} />;
}

async function getHighlighted(code: string, lang: string): Promise<React.ReactNode | null> {
  try {
    return await highlight(code, {
      components: { pre: HighlightPre },
      lang: lang || 'text',
      themes: { light: 'github-light', dark: 'github-dark' },
    });
  } catch (error) {
    console.error('Syntax highlighting error:', error);

    return null;
  }
}

export async function Code({
  className,
  code,
  collapsible,
  lang,
  showLineNumbers,
  title,
  ...props
}: {
  code: string;
  lang: string;
  showLineNumbers?: boolean;
  title?: string;
  collapsible?: boolean;
} & CodeBlockProps) {
  const trimmedCode = code?.trim() || '';
  let rendered: React.ReactNode = EMPTY_CODE_BLOCK;

  if (trimmedCode) {
    const result = await getHighlighted(trimmedCode, lang);

    if (result !== null) {
      rendered = result;
    } else {
      rendered = (
        <Base.Pre>
          <code>{code}</code>
        </Base.Pre>
      );
    }
  }

  return (
    <CodeBlockClient
      className={className}
      code={code?.trim() || ''}
      collapsible={collapsible}
      lang={lang}
      showLineNumbers={showLineNumbers}
      title={title}
      {...props}
    >
      {rendered}
    </CodeBlockClient>
  );
}

Code.displayName = 'IdeasUI.Code';
