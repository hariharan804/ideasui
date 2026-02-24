export const disabled = {
  default:
    'ideasui-disabled disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
} as const;

export const scrollbar = {
  none: 'scrollbar-none [&::-webkit-scrollbar]:hidden',
  default:
    '[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded-full',
  thin: '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded-full',
} as const;
