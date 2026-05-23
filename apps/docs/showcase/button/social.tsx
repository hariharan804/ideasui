import { Button } from '@ideasui/react';
import { Chrome, Github, Apple } from 'lucide-react';

export function Social() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Button className="w-full" color="tertiary">
        <Chrome className="size-4" />
        Sign in with Google
      </Button>
      <Button className="w-full" color="tertiary">
        <Github className="size-4" />
        Sign in with GitHub
      </Button>
      <Button className="w-full" color="tertiary">
        <Apple className="size-4" />
        Sign in with Apple
      </Button>
    </div>
  );
}
