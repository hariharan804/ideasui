import { cn, cva, tw, responsive } from '../tailwind';

describe('tailwind utils', () => {
  describe('cn', () => {
    const P4 = 'p-4';
    const M2 = 'm-2';

    it('should merge classes correctly', () => {
      expect(cn(P4, M2)).toBe(`${P4} ${M2}`);
    });

    it('should resolve conflicts', () => {
      expect(cn(P4, 'p-2')).toBe('p-2');
    });

    it('should handle conditional classes', () => {
      const condition = false;

      expect(cn(P4, condition && M2, 'text-red-500')).toBe(`${P4} text-red-500`);
    });

    it('should handle array inputs', () => {
      expect(cn([P4, M2])).toBe(`${P4} ${M2}`);
    });

    it('should handle object inputs', () => {
      expect(cn({ [P4]: true, [M2]: false })).toBe(P4);
    });
  });

  describe('cva', () => {
    const BASE_CLASS = 'base-class';
    const BG_BLUE = 'bg-blue-500';

    const button = cva(BASE_CLASS, {
      variant: {
        primary: BG_BLUE,
        secondary: 'bg-gray-500',
      },
      size: {
        sm: 'text-sm',
        lg: 'text-lg',
      },
    });

    it('should generate base classes', () => {
      expect(button({})).toBe(BASE_CLASS);
    });

    it('should apply variants', () => {
      expect(button({ variant: 'primary' })).toBe(`${BASE_CLASS} ${BG_BLUE}`);
    });

    it('should apply multiple variants', () => {
      expect(button({ variant: 'primary', size: 'lg' })).toBe(`${BASE_CLASS} ${BG_BLUE} text-lg`);
    });

    it('should overload with custom className', () => {
      expect(button({ variant: 'primary', className: 'custom-class' })).toBe(
        `${BASE_CLASS} ${BG_BLUE} custom-class`,
      );
    });

    it('should handle undefined variants', () => {
      // @ts-ignore
      expect(button({ variant: 'unknown' })).toBe(BASE_CLASS);
    });
  });

  describe('tw', () => {
    const TRUE_CLASS = 'true-class';

    it('should return true classes when condition is true', () => {
      expect(tw(true, TRUE_CLASS)).toBe(TRUE_CLASS);
    });

    it('should return false classes when condition is false', () => {
      expect(tw(false, TRUE_CLASS, 'false-class')).toBe('false-class');
    });

    it('should return empty string when condition is false and no false classes provided', () => {
      expect(tw(false, TRUE_CLASS)).toBe('');
    });
  });

  describe('responsive', () => {
    it('should generate correct string for responsive objects', () => {
      expect(
        responsive({
          base: 'p-2',
          sm: 'p-4',
          md: 'p-6',
        }),
      ).toBe('p-2 sm:p-4 md:p-6');
    });

    it('should handle missing breakpoints', () => {
      expect(
        responsive({
          base: 'p-2',
          lg: 'p-8',
        }),
      ).toBe('p-2 lg:p-8');
    });

    it('should handle all breakpoints', () => {
      expect(
        responsive({
          base: 'text-xs',
          sm: 'text-sm',
          md: 'text-base',
          lg: 'text-lg',
          xl: 'text-xl',
          '2xl': 'text-2xl',
        }),
      ).toBe('text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl');
    });
    it('should handle empty object', () => {
      expect(responsive({})).toBe('');
    });
  });
});
