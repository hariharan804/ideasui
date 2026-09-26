'use client';

import {
  RadioGroup,
  RadioGroupLabel,
  Radio,
  RadioGroupDescription,
  RadioGroupError,
} from '@ideasui/react';

export function Group() {
  return (
    <RadioGroup defaultValue="email">
      <RadioGroupLabel>Notification Channel</RadioGroupLabel>
      <Radio value="email">Email digest</Radio>
      <Radio value="sms">SMS text alerts</Radio>
      <Radio value="push">Push notifications</Radio>
      <RadioGroupDescription>Choose your primary channel for notifications.</RadioGroupDescription>
      <RadioGroupError>Please select a valid option.</RadioGroupError>
    </RadioGroup>
  );
}
