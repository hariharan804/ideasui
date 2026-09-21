'use client';

import { InputField } from '@ideasui/react';
import { Hash, Lock, Search, Mail, Phone, Globe } from 'lucide-react';

export function InputTypes() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <InputField
        description="Native HTML number input with min, max, and step attributes."
        label="Quantity (Number)"
        placeholder="10"
        startContent={<Hash className="h-4 w-4" />}
        type="number"
      />

      <InputField
        description="Masked input field for passwords and secret keys."
        label="Password"
        placeholder="••••••••"
        startContent={<Lock className="h-4 w-4" />}
        type="password"
      />

      <InputField
        description="Native search input with built-in clear button."
        label="Search Query"
        placeholder="Search components..."
        startContent={<Search className="h-4 w-4" />}
        type="search"
      />

      <InputField
        description="Triggers email-optimized keyboard on mobile devices."
        label="Email Address"
        placeholder="alex@example.com"
        startContent={<Mail className="h-4 w-4" />}
        type="email"
      />

      <InputField
        description="Triggers telephone keypad layout on mobile devices."
        label="Phone Number"
        placeholder="+1 (555) 000-0000"
        startContent={<Phone className="h-4 w-4" />}
        type="tel"
      />

      <InputField
        description="Triggers URL-optimized keyboard on mobile devices."
        label="Website URL"
        placeholder="https://ideasui.com"
        startContent={<Globe className="h-4 w-4" />}
        type="url"
      />
    </div>
  );
}
