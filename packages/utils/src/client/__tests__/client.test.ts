import { getElementById, contains, focus } from '../dom';
import { keyboard, composeEventHandlers } from '../events';
import {
  getAttr,
  setAttrs,
  toggleAttr,
  hasAttr,
  getDataAttr,
  setDataAttr,
  toDataAttrs,
} from '../attributes';

describe('client utils', () => {
  describe('dom', () => {
    describe('getElementById', () => {
      it('should return element by id', () => {
        const div = document.createElement('div');
        div.id = 'test-id';
        document.body.appendChild(div);
        expect(getElementById('test-id')).toBe(div);
        document.body.removeChild(div);
      });

      it('should return null if not found', () => {
        expect(getElementById('non-existent')).toBeNull();
      });
    });

    describe('contains', () => {
      it('should return true if parent contains child', () => {
        const parent = document.createElement('div');
        const child = document.createElement('div');
        parent.appendChild(child);
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
        container.appendChild(button1);
        container.appendChild(input);
        container.appendChild(button2);
        document.body.appendChild(container);
      });

      afterEach(() => {
        document.body.removeChild(container);
      });

      it('should set focus and scroll', () => {
        const scrollSpy = jest.fn();
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
        expect(focusable).toHaveLength(3);
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
        const event = {} as any;

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
        const event = { defaultPrevented: false } as any;

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
        const event = { defaultPrevented: false } as any;

        composed(event);
        expect(original).toHaveBeenCalled();
        expect(our).toHaveBeenCalled();
      });
    });
  });

  describe('attributes', () => {
    let div: HTMLDivElement;

    beforeEach(() => {
      div = document.createElement('div');
    });

    describe('getAttr', () => {
      it('should return attribute value', () => {
        div.setAttribute('id', 'test');
        expect(getAttr(div, 'id')).toBe('test');
      });

      it('should return fallback', () => {
        expect(getAttr(div, 'id', 'fallback')).toBe('fallback');
      });

      it('should return null', () => {
        expect(getAttr(div, 'id')).toBeNull();
      });
    });

    describe('setAttrs', () => {
      it('should set attributes', () => {
        setAttrs(div, { id: 'test', class: 'demo' });
        expect(div.getAttribute('id')).toBe('test');
        expect(div.getAttribute('class')).toBe('demo');
      });

      it('should remove attributes if null/undefined', () => {
        div.setAttribute('id', 'test');
        setAttrs(div, { id: null });
        expect(div.hasAttribute('id')).toBe(false);
      });
    });

    describe('toggleAttr', () => {
      it('should add attribute if true', () => {
        toggleAttr(div, 'disabled', true, 'true');
        expect(div.getAttribute('disabled')).toBe('true');
      });

      it('should remove attribute if false', () => {
        div.setAttribute('disabled', 'true');
        toggleAttr(div, 'disabled', false);
        expect(div.hasAttribute('disabled')).toBe(false);
      });
    });

    describe('hasAttr', () => {
      it('should return true if attribute exists', () => {
        div.setAttribute('id', 'test');
        expect(hasAttr(div, 'id')).toBe(true);
      });
    });

    describe('getDataAttr', () => {
      it('should return parsed data attribute', () => {
        div.setAttribute('data-test', '{"a":1}');
        expect(getDataAttr(div, 'test')).toEqual({ a: 1 });
      });

      it('should return raw string if parsing fails', () => {
        div.setAttribute('data-test', 'invalid json');
        expect(getDataAttr(div, 'test')).toBe('invalid json');
      });

      it('should return null if missing', () => {
        expect(getDataAttr(div, 'test')).toBeNull();
      });
    });

    describe('setDataAttr', () => {
      it('should set data attribute', () => {
        setDataAttr(div, 'test', { a: 1 });
        expect(div.getAttribute('data-test')).toBe('{"a":1}');
      });

      it('should set data attribute string', () => {
        setDataAttr(div, 'test', 'value');
        expect(div.getAttribute('data-test')).toBe('value');
      });
    });

    describe('toDataAttrs', () => {
      it('should convert object to data attributes', () => {
        const data = { testKey: 'value', other: 123 };
        expect(toDataAttrs(data)).toEqual({
          'data-test-key': 'value',
          'data-other': '123',
        });
      });
    });
  });
});
