import type { ReactElement } from 'react';

export type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  id?: string;
};

/**
 * Reusable JSON-LD Structured Data component.
 * Safely serializes data and escapes `<` to prevent script injection / syntax corruption.
 */
export function JsonLd({ data, id }: Readonly<JsonLdProps>): ReactElement {
  const json = JSON.stringify(data).replaceAll('<', String.raw`\u003c`);

  return <script dangerouslySetInnerHTML={{ __html: json }} id={id} type="application/ld+json" />;
}
