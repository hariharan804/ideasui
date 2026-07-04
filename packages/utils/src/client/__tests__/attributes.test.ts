import {
  getAttr as getAttribute,
  setAttrs as setAttributes,
  toggleAttr as toggleAttribute,
  hasAttr as hasAttribute,
  getDataAttr as getDataAttribute,
  setDataAttr as setDataAttribute,
  toDataAttrs as toDataAttributes,
} from '../attributes';

describe('attributes', () => {
  let div: HTMLDivElement;

  beforeEach(() => {
    div = document.createElement('div');
  });

  describe('getAttr', () => {
    it('should return attribute value', () => {
      div.setAttribute('id', 'test');
      expect(getAttribute(div, 'id')).toBe('test');
    });

    it('should return fallback', () => {
      expect(getAttribute(div, 'id', 'fallback')).toBe('fallback');
    });

    it('should return null', () => {
      expect(getAttribute(div, 'id')).toBeNull();
    });
  });

  describe('setAttrs', () => {
    it('should set attributes', () => {
      setAttributes(div, { id: 'test', class: 'demo' });
      expect(div.getAttribute('id')).toBe('test');
      expect(div.getAttribute('class')).toBe('demo');
    });

    it('should remove attributes if null/undefined', () => {
      div.setAttribute('id', 'test');
      setAttributes(div, { id: null });
      expect(div.hasAttribute('id')).toBe(false);
    });
  });

  describe('toggleAttr', () => {
    it('should add attribute if true', () => {
      toggleAttribute(div, 'disabled', true, 'true');
      expect(div.getAttribute('disabled')).toBe('true');
    });

    it('should remove attribute if false', () => {
      div.setAttribute('disabled', 'true');
      toggleAttribute(div, 'disabled', false);
      expect(div.hasAttribute('disabled')).toBe(false);
    });
  });

  describe('hasAttr', () => {
    it('should return true if attribute exists', () => {
      div.setAttribute('id', 'test');
      expect(hasAttribute(div, 'id')).toBe(true);
    });
  });

  describe('getDataAttr', () => {
    it('should return parsed data attribute', () => {
      div.dataset.test = '{"a":1}';
      expect(getDataAttribute(div, 'test')).toStrictEqual({ a: 1 });
    });

    it('should return raw string if parsing fails', () => {
      div.dataset.test = 'invalid json';
      expect(getDataAttribute(div, 'test')).toBe('invalid json');
    });

    it('should return null if missing', () => {
      expect(getDataAttribute(div, 'test')).toBeNull();
    });
  });

  describe('setDataAttr', () => {
    it('should set data attribute', () => {
      setDataAttribute(div, 'test', { a: 1 });
      expect(div.dataset.test).toBe('{"a":1}');
    });

    it('should set data attribute string', () => {
      setDataAttribute(div, 'test', 'value');
      expect(div.dataset.test).toBe('value');
    });
  });

  describe('toDataAttrs', () => {
    it('should convert object to data attributes', () => {
      const data = { testKey: 'value', other: 123 };

      expect(toDataAttributes(data)).toStrictEqual({
        'data-test-key': 'value',
        'data-other': '123',
      });
    });
  });
});
