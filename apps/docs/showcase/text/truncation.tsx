import { Text } from '@ideasui/react';

export function TextTruncation() {
  return (
    <div className="max-w-md space-y-4">
      <div>
        <Text className="mb-1 underline" variant="label">
          Single Line Truncation (`truncate`):
        </Text>
        <Text truncate color="secondary">
          This is a very long single line of text that will be truncated with an ellipsis when it
          exceeds the width of its container element.
        </Text>
      </div>

      <div>
        <Text className="mb-1 underline" variant="label">
          Multi-line Line Clamp (`lineClamp={1}`):
        </Text>
        <Text color="secondary" lineClamp={1}>
          IdeasUI typography provides first-class support for multi-line clamping. This paragraph is
          clamped strictly to two lines of text before truncating gracefully with a trailing
          ellipsis regardless of dynamic container resizing.
        </Text>
      </div>
      <div>
        <Text className="mt-2 mb-1 underline" variant="label">
          Multi-line Line Clamp (`lineClamp={2}`):
        </Text>
        <Text color="secondary" lineClamp={2}>
          IdeasUI typography provides first-class support for multi-line clamping. This paragraph is
          clamped strictly to two lines of text before truncating gracefully with a trailing
          ellipsis regardless of dynamic container resizing.
        </Text>
      </div>
      <div>
        <Text className="mt-2 mb-1 underline" variant="label">
          Multi-line Line Clamp (`lineClamp={3}`):
        </Text>
        <Text color="secondary" lineClamp={3}>
          IdeasUI typography provides first-class support for multi-line clamping. This paragraph is
          clamped strictly to two lines of text before truncating gracefully with a trailing
          ellipsis regardless of dynamic container resizing.
        </Text>
      </div>
    </div>
  );
}
