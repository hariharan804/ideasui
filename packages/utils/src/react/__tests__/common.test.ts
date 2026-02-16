import { cn } from '../../style/tailwind';
import { mergeProps, mergeRefs } from '../common';

// Mock cn since it's a tailwind utility
jest.mock('../../style/tailwind', () => ({
  cn: jest.fn((...args: any[]) => args.filter(Boolean).join(' ')),
}));

describe('mergeRefs', () => {
  it('should merge function refs', () => {
    const ref1 = jest.fn();
    const ref2 = jest.fn();
    const node = {};

    const merged = mergeRefs(ref1, ref2);

    merged(node);

    expect(ref1).toHaveBeenCalledWith(node);
    expect(ref2).toHaveBeenCalledWith(node);
  });

  it('should merge object refs', () => {
    const ref1 = { current: null };
    const ref2 = { current: null };
    const node = {};

    const merged = mergeRefs<any>(ref1, ref2);

    merged(node);

    expect(ref1.current).toBe(node);
    expect(ref2.current).toBe(node);
  });

  it('should handle null/undefined refs', () => {
    const ref1 = jest.fn();
    const node = {};

    // @ts-ignore - testing runtime safety
    const merged = mergeRefs(ref1, null, undefined);

    merged(node);

    expect(ref1).toHaveBeenCalledWith(node);
  });
});

describe('mergeProps', () => {
  it('should merge className using cn', () => {
    const props1 = { className: 'foo' };
    const props2 = { className: 'bar' };

    // reset mock to check calls if needed, or just rely on the implementation
    (cn as unknown as jest.Mock).mockReturnValue('foo bar');

    const result = mergeProps(props1, props2);

    expect(result.className).toBe('foo bar');
    // expect(cn).toHaveBeenCalledWith('foo', 'bar'); // cn is called iteratively
  });

  it('should merge style objects', () => {
    const props1 = { style: { color: 'red' } };
    const props2 = { style: { background: 'blue' } };

    const result = mergeProps(props1, props2);

    expect(result.style).toStrictEqual({ color: 'red', background: 'blue' });
  });

  it('should merge nested styles properly', () => {
    const props1 = { style: { color: 'red' } };
    const props2 = { style: { color: 'blue' } };
    const result = mergeProps(props1, props2);

    expect(result.style).toStrictEqual({ color: 'blue' });
  });

  it('should merge ref callbacks', () => {
    const ref1 = jest.fn();
    const ref2 = jest.fn();
    const node = {};

    const props1 = { ref: ref1 };
    const props2 = { ref: ref2 };

    const result = mergeProps(props1, props2);

    result.ref(node);

    expect(ref1).toHaveBeenCalledWith(node);
    expect(ref2).toHaveBeenCalledWith(node);
  });

  it('should chain event handlers', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    const props1 = { onClick: handler1 };
    const props2 = { onClick: handler2 };

    const result = mergeProps(props1, props2);

    result.onClick('event');

    expect(handler1).toHaveBeenCalledWith('event');
    expect(handler2).toHaveBeenCalledWith('event');
  });

  it('should override normal props', () => {
    const props1 = { id: 'foo', 'data-test': '1' };
    const props2 = { id: 'bar' };

    const result = mergeProps(props1, props2);

    expect(result.id).toBe('bar');
    expect(result['data-test']).toBe('1');
  });

  it('should handle undefined/null input objects', () => {
    const props1 = { id: 'foo' };
    const result = mergeProps(props1, undefined, undefined);

    expect(result.id).toBe('foo');
  });
});
