'use client';

import { Switch, SwitchGroup, SwitchGroupDescription, SwitchGroupLabel } from '@ideasui/react';

export function Group() {
  return (
    <div className="p-4">
      <SwitchGroup defaultValue={['email']}>
        <SwitchGroupLabel>Notification Channels</SwitchGroupLabel>
        <Switch value="email">Email</Switch>
        <Switch value="sms">SMS</Switch>
        <Switch value="push">Push Notifications</Switch>
        <SwitchGroupDescription>Enable at least one channel.</SwitchGroupDescription>
      </SwitchGroup>
    </div>
  );
}
