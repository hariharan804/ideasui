import type { Mock } from 'vitest';

import { vi } from 'vitest';

import { cn } from '../../style/tailwind';
import { mergeProps as mergeProperties, mergeRefs as mergeReferences } from '../common';

// Mock cn since it's a tailwind utility
vi.mock('../../style/tailwind', () => ({
  cn: vi.fn((...arguments_: any[]) => arguments_.filter(Boolean).join(' ')),
}));

describe('mergeRefs', () => {
  it('should merge function refs', () => {
    const reference1 = vi.fn();
    const reference2 = vi.fn();
    const node = {};

    const merged = mergeReferences(reference1, reference2);

    merged(node);

    expect(reference1).toHaveBeenCalledWith(node);
    expect(reference2).toHaveBeenCalledWith(node);
  });

  it('should merge object refs', () => {
    const reference1 = { current: null };
    const reference2 = { current: null };
    const node = {};

    const merged = mergeReferences<any>(reference1, reference2);

    merged(node);

    expect(reference1.current).toBe(node);
    expect(reference2.current).toBe(node);
  });

  it('should handle null/undefined refs', () => {
    const reference1 = vi.fn();
    const node = {};

    // @ts-ignore - testing runtime safety
    const merged = mergeReferences(reference1, null);

    merged(node);

    expect(reference1).toHaveBeenCalledWith(node);
  });
});

describe('mergeProps', () => {
  it('should merge className using cn', () => {
    const properties1 = { className: 'foo' };
    const properties2 = { className: 'bar' };

    // reset mock to check calls if needed, or just rely on the implementation
    (cn as unknown as Mock).mockReturnValue('foo bar');

    const result = mergeProperties(properties1, properties2);

    expect(result.className).toBe('foo bar');
  });

  it('should merge style objects', () => {
    const properties1 = { style: { color: 'red' } };
    const properties2 = { style: { background: 'blue' } };

    const result = mergeProperties(properties1, properties2);

    expect(result.style).toStrictEqual({ color: 'red', background: 'blue' });
  });

  it('should merge nested styles properly', () => {
    const properties1 = { style: { color: 'red' } };
    const properties2 = { style: { color: 'blue' } };
    const result = mergeProperties(properties1, properties2);

    expect(result.style).toStrictEqual({ color: 'blue' });
  });

  it('should merge ref callbacks', () => {
    const reference1 = vi.fn();
    const reference2 = vi.fn();
    const node = {};

    const properties1 = { ref: reference1 };
    const properties2 = { ref: reference2 };

    const result = mergeProperties(properties1, properties2);

    result.ref(node);

    expect(reference1).toHaveBeenCalledWith(node);
    expect(reference2).toHaveBeenCalledWith(node);
  });

  it('should chain event handlers', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    const properties1 = { onClick: handler1 };
    const properties2 = { onClick: handler2 };

    const result = mergeProperties(properties1, properties2);

    result.onClick('event');

    expect(handler1).toHaveBeenCalledWith('event');
    expect(handler2).toHaveBeenCalledWith('event');
  });

  it('should override normal props', () => {
    const properties1 = { id: 'foo', 'data-test': '1' };
    const properties2 = { id: 'bar' };

    const result = mergeProperties(properties1, properties2);

    expect(result.id).toBe('bar');
    expect(result['data-test']).toBe('1');
  });

  it('should handle undefined/null input objects', () => {
    const properties1 = { id: 'foo' };
    const result = mergeProperties(properties1);

    expect(result.id).toBe('foo');
  });
});
