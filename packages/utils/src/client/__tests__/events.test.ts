import { keyboard, composeEventHandlers } from '../events';

describe('events', () => {
  describe('keyboard', () => {
    it('should match keys', () => {
      // Correct way to create KeyboardEvent in most environments
      const event = new KeyboardEvent('keydown', { key: 'Enter' });

      expect(keyboard.is(event, 'Enter')).toBe(true);
      expect(keyboard.is(event, ['Enter', 'Space'])).toBe(true);
      expect(keyboard.is(event, 'Escape')).toBe(false);
    });

    it('should check specific keys', () => {
      const enter = new KeyboardEvent('keydown', { key: 'Enter' });

      expect(keyboard.isEnter(enter)).toBe(true);

      const space = new KeyboardEvent('keydown', { key: ' ' });

      expect(keyboard.isSpace(space)).toBe(true);

      const escape = new KeyboardEvent('keydown', { key: 'Escape' });

      expect(keyboard.isEscape(escape)).toBe(true);

      const up = new KeyboardEvent('keydown', { key: 'ArrowUp' });

      expect(keyboard.isArrowUp(up)).toBe(true);

      const down = new KeyboardEvent('keydown', { key: 'ArrowDown' });

      expect(keyboard.isArrowDown(down)).toBe(true);

      const left = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

      expect(keyboard.isArrowLeft(left)).toBe(true);

      const right = new KeyboardEvent('keydown', { key: 'ArrowRight' });

      expect(keyboard.isArrowRight(right)).toBe(true);

      const tab = new KeyboardEvent('keydown', { key: 'Tab' });

      expect(keyboard.isTab(tab)).toBe(true);

      const home = new KeyboardEvent('keydown', { key: 'Home' });

      expect(keyboard.isHome(home)).toBe(true);

      const end = new KeyboardEvent('keydown', { key: 'End' });

      expect(keyboard.isEnd(end)).toBe(true);
    });
  });

  describe('composeEventHandlers', () => {
    it('should call both handlers', () => {
      const original = jest.fn();
      const our = jest.fn();
      const composed = composeEventHandlers(original, our);
      const event = {} as Event;

      composed(event);
      expect(original).toHaveBeenCalledWith(event);
      expect(our).toHaveBeenCalledWith(event);
    });

    it('should not call our handler if default prevented', () => {
      const original = jest.fn((e) => {
        e.defaultPrevented = true;
      });
      const our = jest.fn();
      const composed = composeEventHandlers(original, our);
      const event = { defaultPrevented: false } as unknown as Event;

      composed(event);
      expect(original).toHaveBeenCalled();
      expect(our).not.toHaveBeenCalled();
    });

    it('should call our handler even if prevented when check is false', () => {
      const original = jest.fn((e) => {
        e.defaultPrevented = true;
      });
      const our = jest.fn();
      const composed = composeEventHandlers(original, our, { checkForDefaultPrevented: false });
      const event = { defaultPrevented: false } as unknown as Event;

      composed(event);
      expect(original).toHaveBeenCalled();
      expect(our).toHaveBeenCalled();
    });
  });
});
