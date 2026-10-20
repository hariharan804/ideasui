'use client';

import type { JSX } from 'react';
import { Chip, ChipIcon } from '@ideasui/react';

const CheckIcon = () => (
  <svg aria-hidden="true" className="size-full" fill="currentColor" viewBox="0 0 16 16">
    <path
      clipRule="evenodd"
      d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.739a.75.75 0 0 1 1.04-.208Z"
      fillRule="evenodd"
    />
  </svg>
);

const StarIcon = () => (
  <svg aria-hidden="true" className="size-full" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 1l1.9 3.8 4.2.6-3 3 .7 4.2L8 10.5l-3.8 2 .7-4.2-3-3 4.2-.6z" />
  </svg>
);

export default function ChipIconDemo(): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <Chip
        color="warning"
        startContent={
          <ChipIcon>
            <StarIcon />
          </ChipIcon>
        }
        variant="soft"
      >
        Featured
      </Chip>
      <Chip
        color="success"
        startContent={
          <ChipIcon>
            <CheckIcon />
          </ChipIcon>
        }
        variant="solid"
      >
        Verified
      </Chip>
      <Chip
        color="primary"
        startContent={
          <ChipIcon>
            <StarIcon />
          </ChipIcon>
        }
        variant="outline"
      >
        Premium
      </Chip>
    </div>
  );
}
