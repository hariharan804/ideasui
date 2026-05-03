'use client';
import type { JSX } from 'react';

import { useState } from 'react';
import { Plus, Trash2, Settings, Search, File, User, ChevronRight } from 'lucide-react';
import { Button } from '@ideasui/button';

export default function ButtonPreview(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = (): void => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-12 p-8 pb-24">
      <header className="space-y-4 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">Button Showcase</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
          A high-performance button system with native React Aria accessibility, multiple visual
          variants, and advanced compound component support.
        </p>
      </header>

      {/* 1. Basic Stories Mirror */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-semibold">Basic Stories</h2>
          <span className="bg-muted rounded px-2 py-1 font-mono text-sm">Default & Loading</span>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button isLoading>Processing...</Button>
          <Button isDisabled>Disabled Button</Button>
        </div>
      </section>

      {/* 2. Visual Variants */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-semibold">Visual Variants</h2>
          <span className="bg-muted rounded px-2 py-1 font-mono text-sm">{'variant="*"'}</span>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
              Core Styles
            </h3>
            <div className="flex flex-col gap-2">
              <Button variant="solid">Solid (Default)</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="soft">Soft</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
              Specialized Styles
            </h3>
            <div className="flex flex-col gap-2">
              <Button variant="elevated">Elevated</Button>
              <Button variant="glaze">Glaze (Glass)</Button>
              <Button variant="text">Text</Button>
              <Button variant="link">Link Style</Button>
              <Button isIconOnly aria-label="Icon Variant">
                <Settings className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Elevation Control */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-semibold">Elevation & Depth</h2>
          <span className="bg-muted rounded px-2 py-1 font-mono text-sm">{'elevation="*"'}</span>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="surface border-border flex flex-col items-center justify-center gap-4 rounded-xl border p-6">
            <Button elevation="xs" variant="elevated">
              Elevation XS
            </Button>
            <code className="text-muted-foreground text-xs">{'elevation="xs"'}</code>
          </div>
          <div className="surface border-border flex flex-col items-center justify-center gap-4 rounded-xl border p-6">
            <Button elevation="sm" variant="elevated">
              Elevation SM
            </Button>
            <code className="text-muted-foreground text-xs">{'elevation="sm"'}</code>
          </div>
          <div className="surface border-border flex flex-col items-center justify-center gap-4 rounded-xl border p-6">
            <Button elevation="md" variant="elevated">
              Elevation MD
            </Button>
            <code className="text-muted-foreground text-xs">{'elevation="md"'}</code>
          </div>
          <div className="surface border-border flex flex-col items-center justify-center gap-4 rounded-xl border p-6">
            <Button elevation="lg" variant="elevated">
              Elevation LG
            </Button>
            <code className="text-muted-foreground text-xs">{'elevation="lg"'}</code>
          </div>
          <div className="surface border-border flex flex-col items-center justify-center gap-4 rounded-xl border p-6">
            <Button elevation="xl" variant="elevated">
              Elevation XL
            </Button>
            <code className="text-muted-foreground text-xs">{'elevation="xl"'}</code>
          </div>
          <div className="surface border-border flex flex-col items-center justify-center gap-4 rounded-xl border p-6">
            <Button elevation="2xl" variant="elevated">
              Elevation 2XL
            </Button>
            <code className="text-muted-foreground text-xs">{'elevation="2xl"'}</code>
          </div>
          <div className="surface border-border flex flex-col items-center justify-center gap-4 rounded-xl border p-6">
            <Button elevation="none" variant="ghost">
              None
            </Button>
            <code className="text-muted-foreground text-xs">{'elevation="none"'}</code>
          </div>
          <div className="surface border-border flex flex-col items-center justify-center gap-4 rounded-xl border p-6">
            <Button variant="elevated">Default</Button>
            <code className="text-muted-foreground text-xs">{'variant="elevated"'}</code>
          </div>
        </div>
      </section>

      {/* 4. Premium Glassmorphism */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-semibold">4. Premium Glassmorphism</h2>
          <span className="bg-muted rounded px-2 py-1 font-mono text-sm">{`variant="glaze"`}</span>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center p-12">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative flex flex-wrap justify-center gap-6">
            <Button size="lg" variant="glaze">
              Default Glaze
            </Button>
            <Button color="primary" size="lg" variant="glaze">
              Primary Glaze
            </Button>
            <Button color="success" size="lg" variant="glaze">
              Success Glaze
            </Button>
            <Button color="danger" size="lg" variant="glaze">
              Danger Glaze
            </Button>
            <Button color="info" size="lg" variant="glaze">
              Info Glaze
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Keyboard Shortcuts */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-semibold">5. Keyboard Shortcuts</h2>
          <span className="bg-muted rounded px-2 py-1 font-mono text-sm">Button.Shortcut</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Button fullWidth className="justify-between" variant="outline">
            <div className="flex items-center gap-2">
              <Search className="size-4" />
              <span>Search</span>
            </div>
            <Button.Shortcut>⌘K</Button.Shortcut>
          </Button>

          <Button fullWidth className="justify-between" color="primary">
            <div className="flex items-center gap-2">
              <Plus className="size-4" />
              <span>New File</span>
            </div>
            <Button.Shortcut>⌘N</Button.Shortcut>
          </Button>

          <Button fullWidth className="justify-between" variant="soft">
            <div className="flex items-center gap-2">
              <Trash2 className="size-4" />
              <span>Delete</span>
            </div>
            <Button.Shortcut>⌫</Button.Shortcut>
          </Button>

          <Button fullWidth className="justify-between" variant="glaze">
            <div className="flex items-center gap-2">
              <Settings className="size-4" />
              <span>Settings</span>
            </div>
            <Button.Shortcut>⌘,</Button.Shortcut>
          </Button>
        </div>
      </section>
      {/* 6. Semantic Colors (Full Palette) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-semibold">6. Semantic Colors</h2>
          <span className="bg-muted rounded px-2 py-1 font-mono text-sm">{'color="*"'}</span>
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
              Solid Palette
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button color="primary">Primary</Button>
              <Button color="secondary">Secondary</Button>
              <Button color="tertiary">Tertiary</Button>
              <Button color="success">Success</Button>
              <Button color="warning">Warning</Button>
              <Button color="danger">Danger</Button>
              <Button color="info">Info</Button>
              <Button color="neutral">Neutral</Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
              Soft Palette
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button color="primary" variant="soft">
                Primary
              </Button>
              <Button color="secondary" variant="soft">
                Secondary
              </Button>
              <Button color="tertiary" variant="soft">
                Tertiary
              </Button>
              <Button color="success" variant="soft">
                Success
              </Button>
              <Button color="warning" variant="soft">
                Warning
              </Button>
              <Button color="danger" variant="soft">
                Danger
              </Button>
              <Button color="info" variant="soft">
                Info
              </Button>
              <Button color="neutral" variant="soft">
                Neutral
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Composition Patterns */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-semibold">7. Composition Patterns</h2>
          <span className="bg-muted rounded px-2 py-1 font-mono text-sm">
            Complex Internal Layouts
          </span>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Slot Management</h3>
            <div className="flex flex-wrap gap-4">
              <Button>
                <Button.Icon placement="start">
                  <File className="size-4" />
                </Button.Icon>
                <Button.Label>File Preview</Button.Label>
              </Button>

              <Button color="secondary" variant="outline">
                <Button.Icon>
                  <User className="size-5" />
                </Button.Icon>
                <Button.Label>Profile</Button.Label>
                <Button.Spinner />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium">Quick Icons</h3>
            <div className="flex flex-wrap gap-4">
              <Button startIcon={<Plus className="size-4" />}>Create New</Button>
              <Button endIcon={<ChevronRight className="size-4" />} variant="outline">
                Continue
              </Button>
              <Button isIconOnly aria-label="Settings" color="primary" radius="full" size="lg">
                <Settings />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Button Groups */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-semibold">8. Button Groups</h2>
          <span className="bg-muted rounded px-2 py-1 font-mono text-sm">Button.Group</span>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm italic">Horizontal (Default)</p>
            <Button.Group>
              <Button variant="outline">Undo</Button>
              <Button variant="outline">Redo</Button>
            </Button.Group>
          </div>
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm italic">Attached Solid</p>
            <Button.Group isAttached color="primary">
              <Button>Copy</Button>
              <Button>Paste</Button>
              <Button>Cut</Button>
            </Button.Group>
          </div>
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm italic">Vertical Attached</p>
            <Button.Group isAttached isVertical color="secondary" variant="outline">
              <Button>Profile</Button>
              <Button>Account</Button>
              <Button>Settings</Button>
            </Button.Group>
          </div>
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm italic">Rounded Group</p>
            <Button.Group isAttached color="primary" radius="full">
              <Button>Left</Button>
              <Button>Middle</Button>
              <Button>Right</Button>
            </Button.Group>
          </div>
        </div>
      </section>

      {/* 9. State & Dynamics */}
      <section className="space-y-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-2xl font-semibold">9. State Dynamics</h2>
            </div>
            <div className="bg-muted/30 space-y-4 rounded-xl p-6">
              <p className="text-sm">Interactive loading simulation:</p>
              <Button
                className="w-40"
                color="success"
                isLoading={isLoading}
                onClick={toggleLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </Button>
              <div className="flex gap-2">
                <Button isIconOnly isLoading aria-label="Searching">
                  <Search className="size-5" />
                </Button>
                <Button isDisabled color="danger" startIcon={<Trash2 className="size-4" />}>
                  Forbidden Delete
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="text-2xl font-semibold">10. Border Radius</h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button radius="none" size="sm">
                none
              </Button>
              <Button radius="sm" size="sm">
                sm
              </Button>
              <Button radius="md" size="sm">
                md
              </Button>
              <Button radius="lg" size="sm">
                lg
              </Button>
              <Button radius="xl" size="sm">
                xl
              </Button>
              <Button radius="full" size="sm">
                full
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Sizing Matrix */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-semibold">11. Sizing Matrix</h2>
          <span className="bg-muted rounded px-2 py-1 font-mono text-sm">xs → xl</span>
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <Button color="neutral" size="xs">
            XS
          </Button>
          <Button color="neutral" size="sm">
            Small
          </Button>
          <Button color="neutral" size="md">
            Medium
          </Button>
          <Button color="neutral" size="lg">
            Large
          </Button>
          <Button color="neutral" size="xl">
            Extra Large
          </Button>
        </div>
      </section>

      {/* 12. Utility Layouts */}
      <section className="space-y-6 pt-12">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-semibold">12. Utility Layouts</h2>
          <span className="bg-muted rounded px-2 py-1 font-mono text-sm">fullWidth</span>
        </div>
        <div className="border-primary/30 mx-auto max-w-md space-y-3 rounded-2xl border border-dashed p-8">
          <Button fullWidth color="primary" size="lg">
            Get Started
          </Button>
          <Button fullWidth variant="ghost">
            I already have an account
          </Button>
        </div>
      </section>
    </div>
  );
}
