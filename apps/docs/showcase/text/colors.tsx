import { Text } from '@ideasui/react';

export function TextColors() {
  return (
    <div className="flex flex-col gap-2">
      <Text color="primary">Primary content color</Text>
      <Text color="secondary">Secondary content color</Text>
      <Text color="tertiary">Tertiary content color</Text>
      <Text color="muted">Muted content color</Text>
      <Text color="success">Success status color</Text>
      <Text color="warning">Warning status color</Text>
      <Text color="danger">Danger status color</Text>
      <Text color="info">Info status color</Text>
    </div>
  );
}
