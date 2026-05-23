'use client';

import { Button } from '@ideasui/react';

export function Basic() {
  return <Button onPress={() => console.log('Button pressed')}>Click me</Button>;
}
