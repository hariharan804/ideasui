import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { expectAccessible } from '@ideasui/utils/test';

import { Image, ImageFallback } from '../src';

describe('Image Component', () => {
  it('renders a native img element by default', () => {
    render(<Image alt="Mountain landscape" src="/photo.jpg" />);

    const img = screen.getByRole('img', { name: 'Mountain landscape' });

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/photo.jpg');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('supports priority prop for LCP images', () => {
    render(<Image priority alt="Hero banner" src="/hero.jpg" />);

    const img = screen.getByRole('img', { name: 'Hero banner' });

    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchpriority', 'high');
  });

  it('renders custom image component via renderImage prop', () => {
    const renderImage = vi.fn(({ src, alt, className }) => (
      <img alt={alt ?? ''} className={className} data-testid="custom-renderer" src={src} />
    ));

    render(<Image alt="Custom rendered" renderImage={renderImage} src="/photo.jpg" />);

    expect(renderImage).toHaveBeenCalled();

    const img = screen.getByTestId('custom-renderer');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/photo.jpg');
  });

  it('triggers onLoad callback when image finishes loading', () => {
    const handleLoad = vi.fn();

    render(<Image alt="Test image" src="/photo.jpg" onLoad={handleLoad} />);

    const img = screen.getByRole('img');

    fireEvent.load(img);

    expect(handleLoad).toHaveBeenCalledTimes(1);
  });

  it('shows ImageFallback and calls onError when image fails to load', () => {
    const handleError = vi.fn();

    render(
      <Image alt="Broken image" src="/broken.jpg" onError={handleError}>
        <ImageFallback data-testid="custom-fallback">
          <span>Failed to load</span>
        </ImageFallback>
      </Image>,
    );

    const img = screen.getByRole('img');

    fireEvent.error(img);

    expect(handleError).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.getByText('Failed to load')).toBeInTheDocument();
  });

  it('renders default broken icon fallback when no children supplied on error', () => {
    render(
      <Image
        alt="Broken image"
        slotProps={{ fallback: { 'data-testid': 'default-fallback' } }}
        src="/broken.jpg"
      />,
    );

    const img = screen.getByRole('img');

    fireEvent.error(img);

    expect(screen.getByTestId('default-fallback')).toBeInTheDocument();
  });

  it('renders blur placeholder LQIP image when blurDataURL is provided', () => {
    render(
      <Image
        alt="Blurred image"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQ..."
        slotProps={{ blur: { 'data-testid': 'image-blur' } }}
        src="/photo.jpg"
      />,
    );

    const blurImg = screen.getByTestId('image-blur');

    expect(blurImg).toBeInTheDocument();
    expect(blurImg).toHaveAttribute('src', 'data:image/jpeg;base64,/9j/4AAQ...');
  });

  it('renders skeleton shimmer when isLoading is true', () => {
    render(
      <Image
        isLoading
        alt="Loading image"
        slotProps={{ skeleton: { 'data-testid': 'image-skeleton' } }}
      />,
    );

    const skeleton = screen.getByTestId('image-skeleton');

    expect(skeleton).toBeInTheDocument();
  });

  it('supports custom classNames and slotProps', () => {
    render(
      <Image
        alt="Custom slots"
        classNames={{ root: 'custom-root', img: 'custom-img' }}
        slotProps={{
          root: { 'data-testid': 'image-root' },
          img: { 'data-testid': 'image-img' },
        }}
        src="/photo.jpg"
      />,
    );

    const root = screen.getByTestId('image-root');

    expect(root).toHaveClass('custom-root');

    const img = screen.getByTestId('image-img');

    expect(img).toHaveClass('custom-img');
  });

  // ── Accessibility Tests ──────────────────────────────────────────────────
  it('has zero accessibility violations with valid alt text', async () => {
    const { container } = render(<Image alt="Mountain landscape" src="/photo.jpg" />);

    await expectAccessible(container);
  });

  it('has zero accessibility violations for decorative image with empty alt', async () => {
    const { container } = render(<Image alt="" src="/bg.jpg" />);

    await expectAccessible(container);
  });

  it('has zero accessibility violations with fallback content', async () => {
    const { container } = render(
      <Image alt="Broken image" src="/broken.jpg">
        <ImageFallback>
          <span>Unavailable</span>
        </ImageFallback>
      </Image>,
    );

    await expectAccessible(container);
  });

  it('has zero accessibility violations when isLoading', async () => {
    const { container } = render(<Image isLoading alt="Loading image" />);

    await expectAccessible(container);
  });

  it('has zero accessibility violations with custom renderImage', async () => {
    const { container } = render(
      <Image
        alt="Mountain"
        renderImage={({ src, alt, className }) => (
          <img alt={alt ?? ''} className={className} src={src} />
        )}
        src="/photo.jpg"
      />,
    );

    await expectAccessible(container);
  });
});
