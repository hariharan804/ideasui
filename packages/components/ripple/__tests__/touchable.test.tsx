import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Touchable } from '../src/touchable';

// Mock useRipple to verify calls
const onPressMock = jest.fn();

jest.mock('../src/use-ripple', () => ({
  useRipple: jest.fn(() => ({
    ripples: [],
    onPress: onPressMock,
    onClear: jest.fn(),
  })),
}));

describe('Touchable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('triggers ripple on pointer down', async () => {
    const user = userEvent.setup();

    render(<Touchable>Click me</Touchable>);
    const button = screen.getByRole('button', { name: 'Click me' });

    // Simulate pointer down (press without release)
    await user.pointer({ keys: '[MouseLeft>]', target: button });

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('calls onPointerDown prop', async () => {
    const user = userEvent.setup();
    const onPointerDown = jest.fn();

    render(<Touchable onPointerDown={onPointerDown}>Click me</Touchable>);
    const button = screen.getByRole('button', { name: 'Click me' });

    await user.pointer({ keys: '[MouseLeft>]', target: button });

    expect(onPointerDown).toHaveBeenCalledTimes(1);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not trigger ripple when disabled', async () => {
    const user = userEvent.setup();

    render(<Touchable disabled>Click me</Touchable>);
    const button = screen.getByRole('button', { name: 'Click me' });

    await user.pointer({ keys: '[MouseLeft>]', target: button });

    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('triggers ripple on Enter key', async () => {
    const user = userEvent.setup();

    render(<Touchable>Click me</Touchable>);
    const button = screen.getByRole('button', { name: 'Click me' });

    button.focus();
    await user.keyboard('{Enter}');

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('triggers ripple on Space key', async () => {
    const user = userEvent.setup();

    render(<Touchable>Click me</Touchable>);
    const button = screen.getByRole('button', { name: 'Click me' });

    button.focus();
    await user.keyboard(' ');

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('calls onKeyDown prop', async () => {
    const user = userEvent.setup();
    const onKeyDown = jest.fn();

    render(<Touchable onKeyDown={onKeyDown}>Click me</Touchable>);
    const button = screen.getByRole('button', { name: 'Click me' });

    button.focus();
    await user.keyboard('{Enter}');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not trigger ripple on key down when disabled', async () => {
    const user = userEvent.setup();

    render(<Touchable disabled>Click me</Touchable>);
    const button = screen.getByRole('button', { name: 'Click me' });

    button.focus();
    await user.keyboard('{Enter}');

    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('prevents default on Enter/Space', () => {
    render(<Touchable>Click me</Touchable>);
    const button = screen.getByRole('button', { name: 'Click me' });

    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
      cancelable: true,
    });
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });

    jest.spyOn(enterEvent, 'preventDefault');
    jest.spyOn(spaceEvent, 'preventDefault');

    fireEvent(button, enterEvent);
    expect(enterEvent.preventDefault).toHaveBeenCalled();

    fireEvent(button, spaceEvent);
    expect(spaceEvent.preventDefault).toHaveBeenCalled();
  });
});
