import { Text } from '@ideasui/react';

export function TextPolymorphic() {
  return (
    <div className="flex flex-col gap-3">
      <Text as="h3" size="xl" weight="bold">
        Rendered as an &lt;h3&gt; tag
      </Text>
      <Text as="span" color="secondary">
        Rendered inline as a &lt;span&gt; tag
      </Text>
      <Text as="blockquote" className="border-border border-l-4 pl-4 italic" variant="lead">
        Rendered as a &lt;blockquote&gt; tag with custom border styling
      </Text>
    </div>
  );
}
