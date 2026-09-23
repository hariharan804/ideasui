'use client';

import { Textarea } from '@ideasui/react';

export function Basic() {
  return (
    <div className="w-80">
      <Textarea
        description="Write a brief overview for your public profile."
        label="Biography"
        placeholder="Tell us about yourself..."
      />
    </div>
  );
}
