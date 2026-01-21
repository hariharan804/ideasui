import {
  getAttr,
  setAttrs,
  toggleAttr,
  hasAttr,
  getDataAttr,
  setDataAttr,
  toDataAttrs,
} from '../attributes';

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
