'use client';

import { RadioGroup, RadioGroupLabel, Radio } from '@ideasui/react';

export function GroupHorizontal() {
  return (
    <RadioGroup defaultValue="card" orientation="horizontal">
      <RadioGroupLabel>Payment Method</RadioGroupLabel>
      <Radio value="card">Credit Card</Radio>
      <Radio value="paypal">PayPal</Radio>
      <Radio value="apple">Apple Pay</Radio>
    </RadioGroup>
  );
}
