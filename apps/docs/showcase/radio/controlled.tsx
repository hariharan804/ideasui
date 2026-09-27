'use client';

import { useState } from 'react';
import { RadioGroup, RadioGroupLabel, Radio } from '@ideasui/react';

export function Controlled() {
  const [selected, setSelected] = useState('pro');

  return (
    <div className="flex flex-col gap-3">
      <RadioGroup value={selected} onChange={setSelected}>
        <RadioGroupLabel>Selected Plan</RadioGroupLabel>
        <Radio value="starter">Starter Plan ($9/mo)</Radio>
        <Radio value="pro">Pro Plan ($29/mo)</Radio>
        <Radio value="enterprise">Enterprise Plan ($99/mo)</Radio>
      </RadioGroup>
      <p className="text-content-secondary text-xs">
        Active plan: <span className="text-content-primary font-semibold">{selected}</span>
      </p>
    </div>
  );
}
