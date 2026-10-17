import type { FaqItem } from '@/components/seo';

/**
 * Frequently asked questions for the IdeasUI homepage structured data.
 */
export const HOME_FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: 'What is IdeasUI?',
    answer:
      'IdeasUI is a modern, accessible React component library built with TypeScript, Tailwind CSS v4, and React Aria Components with an OKLCH color system.',
  },
  {
    question: 'Does IdeasUI support Tailwind CSS v4?',
    answer:
      'Yes. IdeasUI is built natively for Tailwind CSS v4 using modern CSS theme variables and Tailwind Variants (tv) without legacy configurations.',
  },
  {
    question: 'Are IdeasUI components accessible?',
    answer:
      'Yes. All components are built on React Aria primitives and target WCAG 2.1 AA accessibility compliance with full keyboard navigation and screen reader support.',
  },
  {
    question: 'Can I use IdeasUI with Next.js and React 19?',
    answer:
      'Yes. IdeasUI fully supports Next.js (App Router and Pages Router), React 19, Vite, and other modern React frameworks with complete Server Components compatibility.',
  },
  {
    question: 'Is IdeasUI free and open-source?',
    answer:
      'Yes, IdeasUI is 100% free, open-source, and licensed under the MIT license for personal and commercial projects.',
  },
] as const;
