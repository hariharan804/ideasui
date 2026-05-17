/* eslint-disable no-restricted-syntax */
import React from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="from-primary to-info flex size-7 items-center justify-center rounded-lg bg-linear-to-br text-sm font-black text-white shadow-sm">
        I
      </div>
      <span className="text-content-primary text-base font-bold tracking-tight">IdeasUI</span>
      <span className="bg-primary/12 text-primary border-primary/28 hidden items-center rounded border px-1.5 py-0.5 text-[10px] font-bold tracking-wide sm:inline-flex">
        v1.0
      </span>
    </div>
  );
}
