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

    expect(container).toBeInTheDocument();
    await expectAccessible(container);
  });

  it('has zero accessibility violations for decorative image with empty alt', async () => {
    const { container } = render(<Image alt="" src="/bg.jpg" />);

    expect(container).toBeInTheDocument();
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

    expect(container).toBeInTheDocument();
    await expectAccessible(container);
  });

  it('has zero accessibility violations when isLoading', async () => {
    const { container } = render(<Image isLoading alt="Loading image" />);

    expect(container).toBeInTheDocument();
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

    expect(container).toBeInTheDocument();
    await expectAccessible(container);
  });

  it('does not forward component-specific props like aspectRatio, radius, shadow to the DOM element', () => {
    render(
      <Image
        isZoomed
        alt="Aspect ratio test"
        aspectRatio="video"
        objectFit="cover"
        radius="md"
        shadow="md"
        slotProps={{ root: { 'data-testid': 'image-root' } }}
        src="/photo.jpg"
      />,
    );

    const root = screen.getByTestId('image-root');

    expect(root).toBeInTheDocument();
    expect(root).not.toHaveAttribute('aspectRatio');
    expect(root).not.toHaveAttribute('radius');
    expect(root).not.toHaveAttribute('shadow');
    expect(root).not.toHaveAttribute('objectFit');
    expect(root).not.toHaveAttribute('isZoomed');
  });

  it('renders shorthand fallback prop when image fails to load', () => {
    render(
      <Image
        alt="Broken image"
        fallback={<span data-testid="shorthand-fallback">Custom fallback</span>}
        src="/broken.jpg"
      />,
    );

    const img = screen.getByRole('img');

    fireEvent.error(img);

    expect(screen.getByTestId('shorthand-fallback')).toBeInTheDocument();
    expect(screen.getByText('Custom fallback')).toBeInTheDocument();
  });

  it('resets loaded state when src changes', () => {
    const { rerender } = render(<Image alt="Image 1" src="/img1.jpg" />);

    const img = screen.getByRole('img');

    fireEvent.load(img);
    expect(img).toHaveClass('ideasui-image__img--loaded');

    rerender(<Image alt="Image 2" src="/img2.jpg" />);

    const img2 = screen.getByRole('img');

    expect(img2).toHaveClass('ideasui-image__img--loading');
  });

  it('preserves wrapper recipe classes when slotProps.root.className is provided', () => {
    render(
      <Image
        alt="Test"
        radius="lg"
        slotProps={{
          root: { 'data-testid': 'root-el', className: 'custom-slot-class' },
        }}
        src="/photo.jpg"
      />,
    );

    const root = screen.getByTestId('root-el');

    expect(root).toHaveClass('ideasui-image');
    expect(root).toHaveClass('ideasui-image--radius-lg');
    expect(root).toHaveClass('custom-slot-class');
  });

  it('supports full SEO attributes: decoding, loading, crossOrigin, referrerPolicy', () => {
    render(
      <Image
        alt="SEO optimized image"
        crossOrigin="anonymous"
        decoding="async"
        loading="lazy"
        referrerPolicy="no-referrer"
        src="/seo.jpg"
      />,
    );

    const img = screen.getByRole('img', { name: 'SEO optimized image' });

    expect(img).toHaveAttribute('decoding', 'async');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('crossorigin', 'anonymous');
    expect(img).toHaveAttribute('referrerpolicy', 'no-referrer');
  });

  it('renders semantic figure and figcaption with aria-labelledby when caption is provided', () => {
    render(
      <Image
        alt="Mountain landscape"
        caption="A beautiful view of the Rocky Mountains"
        slotProps={{ root: { 'data-testid': 'captioned-wrapper' } }}
        src="/mountains.jpg"
      />,
    );

    const figure = screen.getByRole('figure');

    expect(figure).toBeInTheDocument();

    const caption = screen.getByText('A beautiful view of the Rocky Mountains');

    expect(caption).toBeInTheDocument();
    expect(caption.tagName.toLowerCase()).toBe('figcaption');

    const wrapper = screen.getByTestId('captioned-wrapper');

    expect(wrapper).toHaveAttribute('aria-labelledby', caption.id);
  });

  it('supports compound Image.Fallback usage', () => {
    render(
      <Image alt="Compound fallback test" src="/broken.jpg">
        <Image.Fallback data-testid="compound-fallback">
          <span>Failed via Image.Fallback</span>
        </Image.Fallback>
      </Image>,
    );

    const img = screen.getByRole('img');

    fireEvent.error(img);

    expect(screen.getByTestId('compound-fallback')).toBeInTheDocument();
    expect(screen.getByText('Failed via Image.Fallback')).toBeInTheDocument();
  });

  it('marks wrapper with aria-busy while image is loading', () => {
    render(
      <Image
        alt="Loading test"
        slotProps={{ root: { 'data-testid': 'busy-wrapper' } }}
        src="/photo.jpg"
      />,
    );

    const wrapper = screen.getByTestId('busy-wrapper');

    expect(wrapper).toHaveAttribute('aria-busy', 'true');
  });

  it('does not have box shadow by default', () => {
    render(
      <Image
        alt="Default image"
        slotProps={{ root: { 'data-testid': 'no-shadow-image' } }}
        src="/photo.jpg"
      />,
    );

    const root = screen.getByTestId('no-shadow-image');

    expect(root).not.toHaveClass('ideasui-image--shadow-sm');
    expect(root).not.toHaveClass('ideasui-image--shadow-md');
    expect(root).not.toHaveClass('ideasui-image--shadow-lg');
  });

  it('applies shadow modifier only when shadow prop is explicitly provided', () => {
    render(
      <Image
        alt="Shadowed image"
        shadow="md"
        slotProps={{ root: { 'data-testid': 'shadow-image' } }}
        src="/photo.jpg"
      />,
    );

    const root = screen.getByTestId('shadow-image');

    expect(root).toHaveClass('ideasui-image--shadow-md');
    expect(root).toHaveClass('shadow-md');
  });
});
