import type { ReactNode } from 'react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';

export function ExternalLink({
  href,
  children,
}: {
  readonly href: string;
  readonly children: ReactNode;
}) {
  return (
    <a
      className="text-content-secondary hover:text-content-primary flex items-center gap-1.5 transition-colors"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
      <ExternalLinkIcon className="size-3" />
    </a>
  );
}
