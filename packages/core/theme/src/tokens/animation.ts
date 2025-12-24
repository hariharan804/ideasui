export const animation = {
  none: 'none',
  spin: 'spin 1s linear infinite',
  ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  bounce: 'bounce 1s infinite',
  'fade-in': 'fadeIn 0.2s ease-in-out',
  'fade-out': 'fadeOut 0.2s ease-in-out',
  'slide-in': 'slideIn 0.2s ease-out',
  'slide-out': 'slideOut 0.2s ease-in',
  'scale-in': 'scaleIn 0.2s ease-out',
  'scale-out': 'scaleOut 0.2s ease-in',
} as const;