'use client';

import { InputField } from '@ideasui/react';
import { User, Mail, Lock, Search } from 'lucide-react';

export function LabelVariants() {
  return (
    <div className="flex w-80 flex-col gap-6">
      <InputField
        description="Label sits above input field."
        label="Default Label"
        labelVariant="default"
        placeholder="Default label position"
        startContent={<User className="h-4 w-4" />}
      />

      <InputField
        description="Label sits permanently inside top of input wrapper."
        label="Inside Fixed Label"
        labelVariant="inside-fixed"
        placeholder="Inside fixed position"
        startContent={<Mail className="h-4 w-4" />}
      />

      <InputField
        description="Label starts inside and moves to top inside on focus."
        label="Inside Floating Label"
        labelVariant="inside-floating"
        placeholder="Inside Floating position"
        startContent={<Lock className="h-4 w-4" />}
      />

      <InputField
        description="Label starts inside and floats over top border on focus."
        label="Floating Label"
        labelVariant="floating"
        placeholder="Floating position"
        startContent={<Search className="h-4 w-4" />}
      />
    </div>
  );
}
