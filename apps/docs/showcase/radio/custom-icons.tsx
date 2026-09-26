'use client';

import { Radio } from '@ideasui/react';

export function CustomIcons() {
  return (
    <div className="flex flex-col gap-4">
      <Radio
        defaultSelected
        icon={
          <svg className="size-full p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} />
          </svg>
        }
      >
        Custom Check Icon
      </Radio>
      <Radio
        defaultSelected
        icon={
          <svg className="size-full p-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        }
      >
        Custom Star Icon
      </Radio>
    </div>
  );
}
