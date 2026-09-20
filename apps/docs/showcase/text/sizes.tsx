import { Text } from '@ideasui/react';

export function TextSizes() {
  return (
    <div className="flex flex-col gap-2">
      <Text size="xs">Extra Small (xs) — Minimal helper text</Text>
      <Text size="sm">Small (sm) — Secondary labels and captions</Text>
      <Text size="md">Medium (md) — Default body font size</Text>
      <Text size="lg">Large (lg) — Emphasized copy text</Text>
      <Text size="xl">Extra Large (xl) — Section subheadings</Text>
      <Text size="2xl">2X Large (2xl) — Large typography header</Text>
    </div>
  );
}
