import { Text } from '@ideasui/react';

export function TextVariants() {
  return (
    <div className="flex flex-col gap-3">
      <Text variant="lead">Lead paragraph — High impact introduction statement.</Text>
      <Text variant="body">Body paragraph — Standard body text for readable copy blocks.</Text>
      <Text variant="label">Label text — Strong font weight for form elements and UI labels.</Text>
      <Text variant="caption">Caption text — Smaller text size for metadata and hints.</Text>
      <Text variant="overline">OVERLINE BADGE</Text>
      <Text variant="code">const ideasui = &quot;typography&quot;;</Text>
    </div>
  );
}
