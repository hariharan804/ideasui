// Example 1: Basic usage with CSS import
// styles/globals.css
/*
@import "tailwindcss";
@plugin "@ideasui/theme";
*/

// Example 2: Custom plugin configuration
// ideas-ui.ts
import { ideasUIPlugin } from '@ideasui/theme';

export default ideasUIPlugin({
  disableAnimations: false,
  mode: 'light',
  colors: {
    primary: {
      500: 'oklch(0.55 0.25 260)', // Custom purple
    },
  },
});

// styles/globals.css with custom config
/*
@import "tailwindcss";
@plugin "./ideas-ui.ts";
*/

// Example 3: Using with Next.js
// tailwind.config.js
import { ideasUIPlugin } from '@ideasui/theme';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    ideasUIPlugin({
      disableAnimations: process.env.NODE_ENV === 'test',
      mode: 'system',
    }),
  ],
};

// Example 4: Accessibility-first theme
// accessible-theme.ts
import { ideasUIPlugin } from '@ideasui/theme';

export default ideasUIPlugin({
  disableAnimations: true,
  colors: {
    primary: {
      500: 'oklch(0.45 0.30 260)', // Higher contrast
    },
  },
  // Larger touch targets
  spacing: {
    'touch': '44px', // Minimum touch target size
  },
});

// Example 5: Corporate theme
// corporate-theme.ts
import { themes } from '@ideasui/theme';

export default themes.corporate;

// Example 6: Dynamic theme switching
// theme-switcher.tsx
import { useState } from 'react';
import { ideasUIPlugin, themes } from '@ideasui/theme';

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('light');
  
  const applyTheme = (themeName: string) => {
    document.documentElement.className = themeName === 'dark' ? 'dark' : '';
    setCurrentTheme(themeName);
  };

  return (
    <select onChange={(e) => applyTheme(e.target.value)} value={currentTheme}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}

// Example 7: Component with theme colors
// button.tsx
import { cn } from '@ideasui/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Button({ variant = 'primary', size = 'md', children, className }: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        
        // Variant styles
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
          'bg-secondary text-secondary-foreground hover:bg-secondary/90': variant === 'secondary',
          'bg-success text-success-foreground hover:bg-success/90': variant === 'success',
          'bg-warning text-warning-foreground hover:bg-warning/90': variant === 'warning',
          'bg-danger text-danger-foreground hover:bg-danger/90': variant === 'danger',
        },
        
        // Size styles
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4 text-sm': size === 'md',
          'h-12 px-6 text-base': size === 'lg',
        },
        
        className
      )}
    >
      {children}
    </button>
  );
}

// Example 8: Using recipes
// card.tsx
import { recipes } from '@ideasui/theme';
import { cn } from '@ideasui/utils';

interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Card({ variant = 'default', padding = 'md', children, className }: CardProps) {
  return (
    <div
      className={cn(
        recipes.card.base,
        recipes.card.variants.variant[variant],
        recipes.card.variants.padding[padding],
        className
      )}
    >
      {children}
    </div>
  );
}