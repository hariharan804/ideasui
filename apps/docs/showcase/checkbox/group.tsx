'use client';

import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupLabel,
  CheckboxGroupDescription,
  CheckboxGroupError,
} from '@ideasui/react';

export function Group() {
  return (
    <div className="flex flex-col gap-8">
      <CheckboxGroup defaultValue={['email']}>
        <CheckboxGroupLabel>Notification Channels</CheckboxGroupLabel>
        <Checkbox value="email">Email</Checkbox>
        <Checkbox value="sms">SMS</Checkbox>
        <Checkbox value="push">Push Notifications</Checkbox>
        <CheckboxGroupDescription>Select your preferred channels.</CheckboxGroupDescription>
      </CheckboxGroup>

      <CheckboxGroup isInvalid defaultValue={[]}>
        <CheckboxGroupLabel>Required Preferences</CheckboxGroupLabel>
        <Checkbox value="terms">Agree to terms</Checkbox>
        <Checkbox value="privacy">Privacy policy</Checkbox>
        <CheckboxGroupError>You must select at least one option.</CheckboxGroupError>
      </CheckboxGroup>
    </div>
  );
}
