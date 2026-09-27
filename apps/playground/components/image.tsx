'use client';

import type { JSX } from 'react';

import { Image, ImageFallback } from '@ideasui/react';
import { useState } from 'react';

export default function ImagePreview(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-content-primary mb-2 text-3xl font-bold">Image Component</h1>
        <p className="text-content-secondary mb-8">
          Interactive examples of the framework-agnostic Image component with aspect ratios, radius,
          shadow, blur, skeleton, and fallback states.
        </p>
      </div>

      {/* Basic & Radius */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Border Radius</h2>
        <div className="flex flex-wrap items-end gap-4">
          {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((radius) => (
            <div key={radius} className="flex flex-col items-center gap-1">
              <span className="text-content-secondary text-xs">{radius}</span>
              <Image
                alt={`Radius ${radius}`}
                aspectRatio="square"
                radius={radius}
                src="https://picsum.photos/seed/playground-radius/200/200"
                style={{ width: 80 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Aspect Ratios */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Aspect Ratios</h2>
        <div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          <Image
            alt="Square aspect ratio"
            aspectRatio="square"
            radius="md"
            src="https://picsum.photos/seed/playground-square/800/600"
          />
          <Image
            alt="Video aspect ratio"
            aspectRatio="video"
            radius="md"
            src="https://picsum.photos/seed/playground-video/800/600"
          />
          <Image
            alt="4/3 aspect ratio"
            aspectRatio="4/3"
            radius="md"
            src="https://picsum.photos/seed/playground-4-3/800/600"
          />
        </div>
      </div>

      {/* Zoom & Shadow */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">Hover Zoom & Shadow</h2>
        <div className="flex flex-wrap gap-6">
          <Image
            isZoomed
            alt="Hover to zoom"
            aspectRatio="video"
            radius="lg"
            shadow="lg"
            src="https://picsum.photos/seed/playground-zoom/800/600"
            style={{ width: 320 }}
          />
        </div>
      </div>

      {/* Skeleton & Fallback */}
      <div className="space-y-4">
        <h2 className="text-content-primary text-xl font-semibold">
          Async Skeleton & Error Fallback
        </h2>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex w-64 flex-col gap-2">
            <Image
              alt="Async image"
              aspectRatio="video"
              isLoading={isLoading}
              radius="md"
              src={isLoading ? undefined : 'https://picsum.photos/seed/playground-async/800/600'}
            />
            <button
              className="text-primary cursor-pointer text-left text-xs underline"
              type="button"
              onClick={() => setIsLoading((v) => !v)}
            >
              {isLoading ? 'Finish loading' : 'Toggle loading state'}
            </button>
          </div>

          <Image
            alt="Broken image"
            aspectRatio="square"
            radius="md"
            src="/invalid-image.jpg"
            style={{ width: 120 }}
          >
            <ImageFallback>
              <span className="text-content-secondary px-2 text-center text-xs">
                Failed to load
              </span>
            </ImageFallback>
          </Image>
        </div>
      </div>
    </div>
  );
}
