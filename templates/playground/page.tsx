'use client';

import type { JSX } from 'react';

import { {{pascalCase name}}Preview } from '@/components/{{name}}';

export default function {{pascalCase name}}Page(): JSX.Element {
  return (
    <div>
      <{{pascalCase name}} />
    </div>
  );
}
