'use client';

import type { JSX } from 'react';
import type { BadgeAnchorOrigin } from '@ideasui/react';

import { useState } from 'react';
import { Badge } from '@ideasui/react';

function MailIcon(): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      className="text-content-secondary size-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

export default function BadgeAnchorOriginDemo(): JSX.Element {
  const [vertical, setVertical] = useState<'top' | 'bottom'>('top');
  const [horizontal, setHorizontal] = useState<'left' | 'right'>('right');

  const anchorOrigin: BadgeAnchorOrigin = { vertical, horizontal };

  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <div className="flex gap-12">
        {/* Vertical controls */}
        <div className="space-y-2">
          <span className="text-primary text-sm font-semibold">Vertical</span>
          <div className="flex flex-col gap-1.5">
            <label className="text-content-primary flex cursor-pointer items-center gap-2 text-sm">
              <input
                checked={vertical === 'top'}
                className="accent-primary"
                name="vertical"
                type="radio"
                value="top"
                onChange={() => setVertical('top')}
              />
              <span>Top</span>
            </label>
            <label className="text-content-primary flex cursor-pointer items-center gap-2 text-sm">
              <input
                checked={vertical === 'bottom'}
                className="accent-primary"
                name="vertical"
                type="radio"
                value="bottom"
                onChange={() => setVertical('bottom')}
              />
              <span>Bottom</span>
            </label>
          </div>
        </div>

        {/* Horizontal controls */}
        <div className="space-y-2">
          <span className="text-primary text-sm font-semibold">Horizontal</span>
          <div className="flex flex-col gap-1.5">
            <label className="text-content-primary flex cursor-pointer items-center gap-2 text-sm">
              <input
                checked={horizontal === 'right'}
                className="accent-primary"
                name="horizontal"
                type="radio"
                value="right"
                onChange={() => setHorizontal('right')}
              />
              <span>Right</span>
            </label>
            <label className="text-content-primary flex cursor-pointer items-center gap-2 text-sm">
              <input
                checked={horizontal === 'left'}
                className="accent-primary"
                name="horizontal"
                type="radio"
                value="left"
                onChange={() => setHorizontal('left')}
              />
              <span>Left</span>
            </label>
          </div>
        </div>
      </div>

      {/* Badged Mail Icons matching Screenshot 1 */}
      <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
        <Badge anchorOrigin={anchorOrigin} color="secondary" variant="dot">
          <MailIcon />
        </Badge>

        <Badge anchorOrigin={anchorOrigin} badgeContent={1} color="secondary">
          <MailIcon />
        </Badge>

        <Badge anchorOrigin={anchorOrigin} badgeContent={12} color="secondary">
          <MailIcon />
        </Badge>

        <Badge anchorOrigin={anchorOrigin} badgeContent={99} color="secondary">
          <MailIcon />
        </Badge>

        <Badge anchorOrigin={anchorOrigin} badgeContent={1000} color="secondary" max={999}>
          <MailIcon />
        </Badge>
      </div>
    </div>
  );
}
