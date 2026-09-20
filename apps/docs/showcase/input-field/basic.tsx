'use client';

import { InputField } from '@ideasui/react';
import { Mail } from 'lucide-react';

export function Basic() {
  return (
    <div className="w-80">
      <InputField
        description="We will never share your email address."
        label="Email address"
        placeholder="you@example.com"
        startContent={<Mail className="h-4 w-4" />}
      />
    </div>
  );
}
