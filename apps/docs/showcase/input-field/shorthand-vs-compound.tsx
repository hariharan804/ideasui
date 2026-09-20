'use client';

import { InputField } from '@ideasui/react';
import { Mail, Lock } from 'lucide-react';

export function ShorthandVsCompound() {
  return (
    <div className="flex w-80 flex-col gap-6">
      <div>
        <h4 className="text-content-secondary mb-2 text-xs font-semibold tracking-wider uppercase">
          Single Component (Shorthand)
        </h4>
        <InputField
          description="Shorthand prop usage without sub-components."
          label="Email Address"
          placeholder="you@example.com"
          startContent={<Mail className="h-4 w-4" />}
        />
      </div>

      <div>
        <h4 className="text-content-secondary mb-2 text-xs font-semibold tracking-wider uppercase">
          Compound Composition
        </h4>
        <InputField>
          <InputField.Label>Password</InputField.Label>
          <InputField.Input
            placeholder="Enter your password"
            startContent={<Lock className="h-4 w-4" />}
            type="password"
          />
          <InputField.Description>Must be at least 8 characters long.</InputField.Description>
        </InputField>
      </div>
    </div>
  );
}
