import type { Meta, StoryObj } from '@storybook/react-vite';
import type { JSX } from 'react';

import { useState } from 'react';

import { Image, ImageFallback } from '../src';

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    aspectRatio: {
      control: 'select',
      options: ['square', 'video', 'auto', '4/3', '3/2'],
    },
    priority: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
    isZoomed: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

// ── Default ─────────────────────────────────────────────────────
export const Default: Story = {
  render: (): JSX.Element => (
    <Image
      alt="Random landscape"
      height={600}
      src="https://picsum.photos/seed/ideasui/800/600"
      style={{ width: 400, height: 300 }}
      width={800}
    />
  ),
};

// ── Aspect Ratios ───────────────────────────────────────────────
export const AspectRatios: Story = {
  render: (): JSX.Element => (
    <div className="flex flex-col gap-6" style={{ width: 400 }}>
      {(['square', 'video', '4/3', '3/2'] as const).map((ratio) => (
        <div key={ratio}>
          <p className="text-content-secondary mb-1 text-xs">{ratio}</p>
          <Image
            alt={`Aspect ratio ${ratio}`}
            aspectRatio={ratio}
            src={`https://picsum.photos/seed/${ratio.replace('/', '-')}/800/600`}
          />
        </div>
      ))}
    </div>
  ),
};

// ── Object Fit ──────────────────────────────────────────────────
export const ObjectFit: Story = {
  render: (): JSX.Element => (
    <div className="flex flex-wrap gap-4">
      {(['cover', 'contain', 'fill', 'scale-down'] as const).map((fit) => (
        <div key={fit} style={{ width: 160, height: 120 }}>
          <p className="text-content-secondary mb-1 text-xs">{fit}</p>
          <Image
            alt={`Object fit ${fit}`}
            objectFit={fit}
            src="https://picsum.photos/seed/fit/400/300"
            style={{ width: 160, height: 120 }}
          />
        </div>
      ))}
    </div>
  ),
};

// ── Radius ──────────────────────────────────────────────────────
export const Radius: Story = {
  render: (): JSX.Element => (
    <div className="flex flex-wrap items-end gap-4">
      {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((radius) => (
        <div key={radius}>
          <p className="text-content-secondary mb-1 text-xs">{radius}</p>
          <Image
            alt={`Radius ${radius}`}
            aspectRatio="square"
            radius={radius}
            src="https://picsum.photos/seed/radius/200/200"
            style={{ width: 80 }}
          />
        </div>
      ))}
    </div>
  ),
};

// ── Shadow ──────────────────────────────────────────────────────
export const Shadow: Story = {
  render: (): JSX.Element => (
    <div className="flex flex-wrap gap-8 p-6">
      {(['none', 'sm', 'md', 'lg'] as const).map((shadow) => (
        <div key={shadow}>
          <p className="text-content-secondary mb-2 text-xs">{shadow}</p>
          <Image
            alt={`Shadow ${shadow}`}
            radius="md"
            shadow={shadow}
            src="https://picsum.photos/seed/shadow/400/300"
            style={{ width: 160, height: 120 }}
          />
        </div>
      ))}
    </div>
  ),
};

// ── Zoom on Hover ───────────────────────────────────────────────
export const Zoomed: Story = {
  render: (): JSX.Element => (
    <Image
      isZoomed
      alt="Hover to zoom"
      aspectRatio="video"
      radius="lg"
      src="https://picsum.photos/seed/zoom/800/600"
      style={{ width: 400 }}
    />
  ),
};

// ── Priority (LCP) ──────────────────────────────────────────────
export const Priority: Story = {
  render: (): JSX.Element => (
    <Image
      priority
      alt="Hero image — priority loaded"
      aspectRatio="video"
      src="https://picsum.photos/seed/priority/1200/600"
      style={{ width: '100%' }}
    />
  ),
};

// ── Blur Placeholder (LQIP) ─────────────────────────────────────
export const BlurPlaceholder: Story = {
  render: (): JSX.Element => (
    <Image
      alt="Image with blur placeholder"
      aspectRatio="video"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+"
      src="https://picsum.photos/seed/blur/800/600"
      style={{ width: 400 }}
    />
  ),
};

// ── Loading Skeleton ────────────────────────────────────────────
function LoadingSkeletonDemo(): JSX.Element {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col gap-4" style={{ width: 400 }}>
      <Image
        alt="Async loaded image"
        aspectRatio="video"
        isLoading={loading}
        radius="md"
        src={loading ? undefined : 'https://picsum.photos/seed/skeleton/800/600'}
      />
      <button
        className="text-primary w-fit cursor-pointer text-sm underline"
        type="button"
        onClick={() => setLoading((v) => !v)}
      >
        {loading ? 'Simulate load complete' : 'Reset to loading'}
      </button>
    </div>
  );
}

export const LoadingSkeleton: Story = {
  render: (): JSX.Element => <LoadingSkeletonDemo />,
};

// ── Error Fallback ──────────────────────────────────────────────
export const ErrorFallback: Story = {
  render: (): JSX.Element => (
    <div className="flex gap-4">
      {/* Default broken icon fallback */}
      <Image
        alt="Broken image"
        aspectRatio="square"
        radius="md"
        src="/this-does-not-exist.jpg"
        style={{ width: 120 }}
      />
      {/* Custom fallback content */}
      <Image
        alt="Broken image with custom fallback"
        aspectRatio="square"
        radius="md"
        src="/this-does-not-exist.jpg"
        style={{ width: 120 }}
      >
        <ImageFallback>
          <span className="text-content-secondary px-2 text-center text-xs">Image unavailable</span>
        </ImageFallback>
      </Image>
    </div>
  ),
};

// ── Next.js Image (simulated) ───────────────────────────────────
function SimulatedNextImage({
  src,
  alt,
  className,
  width,
  height,
}: {
  readonly src?: string;
  readonly alt?: string;
  readonly className?: string;
  readonly width?: number;
  readonly height?: number;
}): JSX.Element {
  return (
    <img
      alt={alt ?? ''}
      className={className}
      height={height}
      src={src}
      style={{
        objectFit: 'cover',
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
      width={width}
    />
  );
}

export const NextJsIntegration: Story = {
  render: (): JSX.Element => (
    <div className="flex flex-col gap-6" style={{ width: 400 }}>
      <div>
        <p className="text-content-secondary mb-1 text-xs">Fill mode</p>
        <Image
          alt="Next.js fill mode"
          aspectRatio="video"
          radius="lg"
          renderImage={({ src, alt, className }) => (
            <SimulatedNextImage alt={alt} className={className} src={src} />
          )}
          src="https://picsum.photos/seed/nextjs/800/600"
        />
      </div>
      <div>
        <p className="text-content-secondary mb-1 text-xs">Fixed dimensions</p>
        <Image
          alt="Next.js fixed dimensions"
          height={600}
          radius="md"
          renderImage={({ src, alt, width, height, className }) => (
            <SimulatedNextImage
              alt={alt}
              className={className}
              height={height}
              src={src}
              width={width}
            />
          )}
          shadow="md"
          src="https://picsum.photos/seed/nextjs2/800/600"
          width={800}
        />
      </div>
    </div>
  ),
};

// ── All Features Combined ───────────────────────────────────────
export const AllFeatures: Story = {
  render: (): JSX.Element => (
    <Image
      isZoomed
      alt="All features combined"
      aspectRatio="video"
      objectFit="cover"
      radius="xl"
      shadow="lg"
      src="https://picsum.photos/seed/all/800/600"
      style={{ width: 480 }}
    >
      <ImageFallback>
        <span className="text-content-secondary text-sm">Image unavailable</span>
      </ImageFallback>
    </Image>
  ),
};

// ── Playground ──────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    src: 'https://picsum.photos/seed/playground/800/600',
    alt: 'Playground image',
    aspectRatio: 'video',
    objectFit: 'cover',
    radius: 'none',
    shadow: 'none',
    priority: false,
    isLoading: false,
    isZoomed: false,
  },
  render: (args): JSX.Element => <Image {...args} style={{ width: 400 }} />,
};
