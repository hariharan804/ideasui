import { JsonLd } from './json-ld';

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqJsonLdProps = {
  items: readonly FaqItem[];
  id?: string;
};

/**
 * Renders FAQPage structured data following Schema.org standards.
 * Enables Google rich results for pages containing frequently asked questions.
 */
export function FaqJsonLd({ items, id = 'jsonld-faq' }: Readonly<FaqJsonLdProps>) {
  if (!items || items.length === 0) return null;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={data} id={id} />;
}
