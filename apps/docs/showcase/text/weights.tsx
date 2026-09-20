import { Text } from '@ideasui/react';

export function TextWeights() {
  return (
    <div className="flex flex-col gap-2">
      <Text weight="regular">Regular weight (400)</Text>
      <Text weight="medium">Medium weight (500)</Text>
      <Text weight="semibold">Semibold weight (600)</Text>
      <Text weight="bold">Bold weight (700)</Text>
    </div>
  );
}
