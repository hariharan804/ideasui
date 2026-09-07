import { Button } from '@ideasui/react';

export function Disabled() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button isDisabled>Primary</Button>
      <Button isDisabled color="secondary">
        Secondary
      </Button>
      <Button isDisabled color="tertiary">
        Tertiary
      </Button>
      <Button isDisabled variant="outline">
        Outline
      </Button>
      <Button isDisabled variant="ghost">
        Ghost
      </Button>
      <Button isDisabled color="danger">
        Danger
      </Button>
    </div>
  );
}
