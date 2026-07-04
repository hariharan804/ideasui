import { getElementById, contains, focus } from '../dom';

describe('dom', () => {
  describe('getElementById', () => {
    it('should return element by id', () => {
      const div = document.createElement('div');

      div.id = 'test-id';
      document.body.append(div);
      expect(getElementById('test-id')).toBe(div);
      div.remove();
    });

    it('should return null if not found', () => {
      expect(getElementById('non-existent')).toBeNull();
    });
  });

  describe('contains', () => {
    it('should return true if parent contains child', () => {
      const parent = document.createElement('div');
      const child = document.createElement('div');

      parent.append(child);
      expect(contains(parent, child)).toBe(true);
    });

    it('should return true if parent is child', () => {
      const div = document.createElement('div');

      expect(contains(div, div)).toBe(true);
    });

    it('should return false if parent does not contain child', () => {
      const parent = document.createElement('div');
      const child = document.createElement('div');

      expect(contains(parent, child)).toBe(false);
    });

    it('should return false if parent or child is null', () => {
      const div = document.createElement('div');

      expect(contains(null, div)).toBe(false);
      expect(contains(div, null)).toBe(false);
    });
  });

  describe('focus', () => {
    let container: HTMLElement;
    let button1: HTMLButtonElement;
    let button2: HTMLButtonElement;
    let input: HTMLInputElement;

    beforeEach(() => {
      container = document.createElement('div');
      button1 = document.createElement('button');
      button2 = document.createElement('button');
      input = document.createElement('input');
      container.append(button1);
      container.append(input);
      container.append(button2);
      document.body.append(container);
    });

    afterEach(() => {
      container.remove();
    });

    it('should set focus and scroll', () => {
      const scrollSpy = vi.fn();

      button1.scrollIntoView = scrollSpy;
      focus.set(button1);
      expect(document.activeElement).toBe(button1);
      expect(scrollSpy).toHaveBeenCalled();
    });

    it('should safe handle null element', () => {
      expect(() => focus.set(null)).not.toThrow();
    });

    it('should get focusable elements', () => {
      const focusable = focus.getFocusable(container);
      const EXPECTED_LENGTH = 3;

      expect(focusable).toHaveLength(EXPECTED_LENGTH);
      expect(focusable).toContain(button1);
      expect(focusable).toContain(button2);
      expect(focusable).toContain(input);
    });

    it('should get first focusable', () => {
      expect(focus.getFirst(container)).toBe(button1);
    });

    it('should get last focusable', () => {
      expect(focus.getLast(container)).toBe(button2);
    });
  });
});
