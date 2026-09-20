'use client';

import { InputField } from '@ideasui/react';
import { Hash, DollarSign, Type, Binary } from 'lucide-react';

export function InputFilter() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <InputField
        description="Only digits (0-9) allowed. Defaults virtual keyboard to numeric."
        inputFilter="numeric"
        label="Numeric Filter (0-9)"
        placeholder="Try typing 123456..."
        startContent={<Hash className="h-4 w-4" />}
      />

      <InputField
        description="Digits and single decimal point allowed (0-9, .)."
        inputFilter="decimal"
        label="Decimal Filter (0-9, .)"
        placeholder="Try typing 99.99..."
        startContent={<DollarSign className="h-4 w-4" />}
      />

      <InputField
        description="Only alphabetic characters allowed (A-Z, a-z)."
        inputFilter="alpha"
        label="Alpha Filter (A-Z, a-z)"
        placeholder="Try typing Hariharan..."
        startContent={<Type className="h-4 w-4" />}
      />

      <InputField
        description="Only alphanumeric characters allowed (A-Z, a-z, 0-9)."
        inputFilter="alphanumeric"
        label="Alphanumeric Filter (A-Z, a-z, 0-9)"
        placeholder="Try typing Hari123..."
        startContent={<Binary className="h-4 w-4" />}
      />
    </div>
  );
}
