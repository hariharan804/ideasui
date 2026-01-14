import 'jest-axe';

declare module 'expect' {
  interface Matchers<R> {
    toHaveNoViolations(): R;
  }
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
}
