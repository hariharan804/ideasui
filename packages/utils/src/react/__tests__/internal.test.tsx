import type { JSX } from 'react';

import { isIdeasUIComponent, getIdeasUIComponentName, isIdeasUIElement } from '../internal';

describe('internal utils', () => {
  const IdeasComponent = (): JSX.Element => <div>Ideas</div>;

  IdeasComponent.displayName = 'IdeasUI.Component';

  const RegularComponent = (): JSX.Element => <div>Regular</div>;

  RegularComponent.displayName = 'RegularComponent';

  const AnonymousComponent = (): JSX.Element => <div>Anonymous</div>;

  describe('isIdeasUIComponent', () => {
    it('should return true for IdeasUI components', () => {
      expect(isIdeasUIComponent(IdeasComponent)).toBe(true);
    });

    it('should return false for regular components', () => {
      expect(isIdeasUIComponent(RegularComponent)).toBe(false);
    });

    it('should return false for anonymous components', () => {
      expect(isIdeasUIComponent(AnonymousComponent)).toBe(false);
    });
  });

  describe('getIdeasUIComponentName', () => {
    it('should return component name for IdeasUI components', () => {
      expect(getIdeasUIComponentName(IdeasComponent)).toBe('Component');
    });

    it('should return null for regular components', () => {
      expect(getIdeasUIComponentName(RegularComponent)).toBeNull();
    });

    it('should return null for anonymous components', () => {
      expect(getIdeasUIComponentName(AnonymousComponent)).toBeNull();
    });
  });

  describe('isIdeasUIElement', () => {
    it('should return true for elements created from IdeasUI components', () => {
      const element = <IdeasComponent />;

      expect(isIdeasUIElement(element)).toBe(true);
    });

    it('should return false for elements created from regular components', () => {
      const element = <RegularComponent />;

      expect(isIdeasUIElement(element)).toBe(false);
    });

    it('should return false for DOM elements', () => {
      const element = <div />;

      expect(isIdeasUIElement(element)).toBe(false);
    });
  });
});
