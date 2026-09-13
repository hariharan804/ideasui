'use client';
import type { JSX } from 'react';

import { useState } from 'react';
import {
  Plus,
  Trash2,
  Settings,
  Search,
  File,
  ChevronRight,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Sliders,
  Code2,
} from 'lucide-react';
import { Button } from '@ideasui/button';

type ButtonVariant = 'solid' | 'outline' | 'soft' | 'ghost' | 'elevated' | 'text' | 'link';
type ButtonColor =
  'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ButtonElevation = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function ButtonPreview(): JSX.Element {
  // Sandbox State
  const [variant, setVariant] = useState<ButtonVariant>('solid');
  const [color, setColor] = useState<ButtonColor>('primary');
  const [size, setSize] = useState<ButtonSize>('md');
  const [radius, setRadius] = useState<ButtonRadius>('md');
  const [elevation, setElevation] = useState<ButtonElevation>('none');
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isIconOnly, setIsIconOnly] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [buttonText, setButtonText] = useState('Interactive Button');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'sandbox' | 'matrix' | 'groups' | 'a11y'>('sandbox');

  // Generate live code snippet
  const generateCode = (): string => {
    const props: string[] = [];

    if (variant !== 'solid') props.push(`variant="${variant}"`);
    if (color !== 'primary') props.push(`color="${color}"`);
    if (size !== 'md') props.push(`size="${size}"`);
    if (radius !== 'md') props.push(`radius="${radius}"`);
    if (elevation !== 'none') props.push(`elevation="${elevation}"`);
    if (isLoading) props.push('isLoading');
    if (isDisabled) props.push('isDisabled');
    if (isIconOnly) props.push('isIconOnly');
    if (fullWidth) props.push('fullWidth');

    const propsString = props.length > 0 ? ` ${props.join(' ')}` : '';

    if (isIconOnly) {
      return `<Button${propsString} aria-label="Settings">\n  <Settings className="size-5" />\n</Button>`;
    }

    return `<Button${propsString}>\n  ${buttonText}\n</Button>`;
  };

  const handleCopyCode = (): void => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetSandbox = (): void => {
    setVariant('solid');
    setColor('primary');
    setSize('md');
    setRadius('md');
    setElevation('none');
    setIsLoading(false);
    setIsDisabled(false);
    setIsIconOnly(false);
    setFullWidth(false);
    setButtonText('Interactive Button');
  };

  return (
    <div className="bg-background text-content-primary min-h-screen py-10 pb-28 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl space-y-10 px-4 sm:px-6">
        {/* Title & Introduction Header */}
        <header className="flex flex-col gap-4 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="bg-primary-subtle text-primary mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold shadow-2xs">
              <Sparkles className="size-3.5" />
              <span>@ideasui/button</span>
            </div>
            <h1 className="text-content-primary text-4xl font-extrabold tracking-tight sm:text-5xl">
              Button Component
            </h1>
            <p className="text-content-secondary mt-2 max-w-3xl text-base leading-relaxed">
              High-performance interactive trigger primitives with native React Aria accessibility,
              OKLCH color recipes, and elevation depth support.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-surface-subtle/80 flex items-center gap-1 rounded-2xl p-1.5 shadow-2xs">
            <button
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === 'sandbox'
                  ? 'bg-surface text-primary shadow-xs'
                  : 'text-content-secondary hover:text-content-primary'
              }`}
              onClick={() => setActiveTab('sandbox')}
            >
              <Sliders className="size-3.5" />
              Interactive Sandbox
            </button>
            <button
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === 'matrix'
                  ? 'bg-surface text-primary shadow-xs'
                  : 'text-content-secondary hover:text-content-primary'
              }`}
              onClick={() => setActiveTab('matrix')}
            >
              <Sparkles className="size-3.5" />
              Variants &amp; Palette
            </button>
            <button
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === 'groups'
                  ? 'bg-surface text-primary shadow-xs'
                  : 'text-content-secondary hover:text-content-primary'
              }`}
              onClick={() => setActiveTab('groups')}
            >
              <File className="size-3.5" />
              Button Groups
            </button>
            <button
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === 'a11y'
                  ? 'bg-surface text-primary shadow-xs'
                  : 'text-content-secondary hover:text-content-primary'
              }`}
              onClick={() => setActiveTab('a11y')}
            >
              <Code2 className="size-3.5" />
              Shortcuts &amp; A11Y
            </button>
          </div>
        </header>

        {/* SECTION 1: Interactive Sandbox */}
        {activeTab === 'sandbox' ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Live Canvas Stage (8 cols) */}
            <div className="flex flex-col gap-6 lg:col-span-7">
              <div className="bg-surface/80 relative flex min-h-[380px] flex-col items-center justify-center rounded-3xl p-8 shadow-sm backdrop-blur-xl transition-all">
                {/* Live component preview canvas */}
                <div
                  className={`flex w-full items-center justify-center p-8 transition-all ${fullWidth ? 'max-w-md' : ''}`}
                >
                  <Button
                    aria-label={isIconOnly ? 'Settings' : buttonText}
                    color={color}
                    elevation={elevation}
                    fullWidth={fullWidth}
                    isDisabled={isDisabled}
                    isIconOnly={isIconOnly}
                    isLoading={isLoading}
                    radius={radius}
                    size={size}
                    variant={variant}
                  >
                    {isIconOnly ? <Settings className="size-5" /> : buttonText}
                  </Button>
                </div>

                {/* Canvas Toolbar Footer */}
                <div className="bg-surface-subtle/80 absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-2xl px-4 py-2.5 shadow-2xs backdrop-blur-md">
                  <div className="text-content-secondary flex items-center gap-2 font-mono text-xs">
                    <span>size=&quot;{size}&quot;</span>
                    <span>•</span>
                    <span>variant=&quot;{variant}&quot;</span>
                    <span>•</span>
                    <span>color=&quot;{color}&quot;</span>
                  </div>

                  <Button color="neutral" size="xs" variant="ghost" onClick={handleResetSandbox}>
                    <RotateCcw className="size-3.5" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="bg-surface/80 overflow-hidden rounded-3xl shadow-xs backdrop-blur-md">
                <div className="bg-surface-muted/50 flex items-center justify-between px-5 py-3.5">
                  <div className="text-content-primary flex items-center gap-2 font-mono text-xs font-semibold">
                    <Code2 className="text-primary size-4" />
                    JSX Usage Snippet
                  </div>
                  <Button color="neutral" size="xs" variant="ghost" onClick={handleCopyCode}>
                    {copied ? (
                      <Check className="text-success size-3.5" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </Button>
                </div>
                <pre className="text-content-primary bg-background/40 overflow-x-auto p-5 font-mono text-xs">
                  <code>{generateCode()}</code>
                </pre>
              </div>
            </div>

            {/* Controls Panel (5 cols) */}
            <div className="bg-surface/80 space-y-6 rounded-3xl p-6 shadow-sm backdrop-blur-xl lg:col-span-5">
              <div className="flex items-center justify-between pb-2">
                <h3 className="text-content-primary flex items-center gap-2 text-lg font-bold">
                  <Sliders className="text-primary size-4" />
                  Props Inspector
                </h3>
              </div>

              {/* Label Text Input */}
              {isIconOnly ? null : (
                <div className="space-y-1.5">
                  <label
                    className="text-content-secondary text-xs font-semibold"
                    htmlFor="sandbox-button-label-input"
                  >
                    Button Label
                  </label>
                  <input
                    className="bg-surface-subtle text-content-primary focus:ring-primary/20 w-full rounded-xl border-none px-3.5 py-2.5 text-sm shadow-inner focus:ring-2 focus:outline-none"
                    id="sandbox-button-label-input"
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                  />
                </div>
              )}

              {/* Variant Selector */}
              <div className="space-y-1.5">
                <span className="text-content-secondary block text-xs font-semibold">
                  Variant (`variant`)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      'solid',
                      'outline',
                      'soft',
                      'ghost',
                      'elevated',
                      'text',
                      'link',
                    ] as ButtonVariant[]
                  ).map((v) => (
                    <button
                      key={v}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                        variant === v
                          ? 'bg-primary text-on-primary font-bold shadow-xs'
                          : 'bg-surface-subtle text-content-secondary hover:bg-surface-muted'
                      }`}
                      onClick={() => setVariant(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="space-y-1.5">
                <span className="text-content-secondary block text-xs font-semibold">
                  Color (`color`)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      'primary',
                      'secondary',
                      'tertiary',
                      'success',
                      'warning',
                      'danger',
                      'info',
                      'neutral',
                    ] as ButtonColor[]
                  ).map((c) => (
                    <button
                      key={c}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition-all ${
                        color === c
                          ? 'bg-primary text-on-primary font-bold shadow-xs'
                          : 'bg-surface-subtle text-content-secondary hover:bg-surface-muted'
                      }`}
                      onClick={() => setColor(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-1.5">
                <span className="text-content-secondary block text-xs font-semibold">
                  Size (`size`)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(['xs', 'sm', 'md', 'lg', 'xl'] as ButtonSize[]).map((s) => (
                    <button
                      key={s}
                      className={`rounded-lg px-3 py-1 text-xs font-medium uppercase transition-all ${
                        size === s
                          ? 'bg-primary text-on-primary font-bold shadow-xs'
                          : 'bg-surface-subtle text-content-secondary hover:bg-surface-muted'
                      }`}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Radius Selector */}
              <div className="space-y-1.5">
                <span className="text-content-secondary block text-xs font-semibold">
                  Corner Radius (`radius`)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as ButtonRadius[]).map((r) => (
                    <button
                      key={r}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                        radius === r
                          ? 'bg-primary text-on-primary font-bold shadow-xs'
                          : 'bg-surface-subtle text-content-secondary hover:bg-surface-muted'
                      }`}
                      onClick={() => setRadius(r)}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Elevation Depth */}
              <div className="space-y-1.5">
                <span className="text-content-secondary block text-xs font-semibold">
                  Elevation Shadow (`elevation`)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as ButtonElevation[]).map((e) => (
                    <button
                      key={e}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                        elevation === e
                          ? 'bg-primary text-on-primary font-bold shadow-xs'
                          : 'bg-surface-subtle text-content-secondary hover:bg-surface-muted'
                      }`}
                      onClick={() => setElevation(e)}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              {/* Boolean Toggles */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <label className="text-content-primary flex cursor-pointer items-center gap-2 text-xs font-medium">
                  <input
                    checked={isLoading}
                    className="accent-primary size-4 cursor-pointer rounded"
                    type="checkbox"
                    onChange={(e) => setIsLoading(e.target.checked)}
                  />
                  <span>`isLoading`</span>
                </label>

                <label className="text-content-primary flex cursor-pointer items-center gap-2 text-xs font-medium">
                  <input
                    checked={isDisabled}
                    className="accent-primary size-4 cursor-pointer rounded"
                    type="checkbox"
                    onChange={(e) => setIsDisabled(e.target.checked)}
                  />
                  <span>`isDisabled`</span>
                </label>

                <label className="text-content-primary flex cursor-pointer items-center gap-2 text-xs font-medium">
                  <input
                    checked={isIconOnly}
                    className="accent-primary size-4 cursor-pointer rounded"
                    type="checkbox"
                    onChange={(e) => setIsIconOnly(e.target.checked)}
                  />
                  <span>`isIconOnly`</span>
                </label>

                <label className="text-content-primary flex cursor-pointer items-center gap-2 text-xs font-medium">
                  <input
                    checked={fullWidth}
                    className="accent-primary size-4 cursor-pointer rounded"
                    type="checkbox"
                    onChange={(e) => setFullWidth(e.target.checked)}
                  />
                  <span>`fullWidth`</span>
                </label>
              </div>
            </div>
          </div>
        ) : null}

        {/* SECTION 2: Variants & Palette Matrix */}
        {activeTab === 'matrix' ? <MatrixTab /> : null}

        {/* SECTION 3: Compound Button Groups */}
        {activeTab === 'groups' ? <GroupsTab /> : null}

        {/* SECTION 4: Shortcuts & A11Y */}
        {activeTab === 'a11y' ? <A11yTab /> : null}
      </div>
    </div>
  );
}

function MatrixTab() {
  return (
    <div className="space-y-12">
      {/* Visual Variants */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-content-primary text-xl font-bold">Visual Styles (`variant`)</h2>
          <span className="text-content-muted font-mono text-xs">7 Options</span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          <div className="bg-surface/80 flex flex-col items-center gap-3 rounded-2xl p-5 text-center shadow-xs">
            <Button variant="solid">Solid</Button>
            <span className="text-content-secondary font-mono text-[11px]">
              variant=&quot;solid&quot;
            </span>
          </div>
          <div className="bg-surface/80 flex flex-col items-center gap-3 rounded-2xl p-5 text-center shadow-xs">
            <Button variant="outline">Outline</Button>
            <span className="text-content-secondary font-mono text-[11px]">
              variant=&quot;outline&quot;
            </span>
          </div>
          <div className="bg-surface/80 flex flex-col items-center gap-3 rounded-2xl p-5 text-center shadow-xs">
            <Button variant="soft">Soft</Button>
            <span className="text-content-secondary font-mono text-[11px]">
              variant=&quot;soft&quot;
            </span>
          </div>
          <div className="bg-surface/80 flex flex-col items-center gap-3 rounded-2xl p-5 text-center shadow-xs">
            <Button variant="ghost">Ghost</Button>
            <span className="text-content-secondary font-mono text-[11px]">
              variant=&quot;ghost&quot;
            </span>
          </div>
          <div className="bg-surface/80 flex flex-col items-center gap-3 rounded-2xl p-5 text-center shadow-xs">
            <Button variant="elevated">Elevated</Button>
            <span className="text-content-secondary font-mono text-[11px]">
              variant=&quot;elevated&quot;
            </span>
          </div>
          <div className="bg-surface/80 flex flex-col items-center gap-3 rounded-2xl p-5 text-center shadow-xs">
            <Button variant="text">Text</Button>
            <span className="text-content-secondary font-mono text-[11px]">
              variant=&quot;text&quot;
            </span>
          </div>
          <div className="bg-surface/80 flex flex-col items-center gap-3 rounded-2xl p-5 text-center shadow-xs">
            <Button variant="link">Link</Button>
            <span className="text-content-secondary font-mono text-[11px]">
              variant=&quot;link&quot;
            </span>
          </div>
        </div>
      </section>

      {/* Semantic Color Palette */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-content-primary text-xl font-bold">Semantic Color Palette</h2>
          <span className="text-content-muted font-mono text-xs">8 Colors x 3 Variants</span>
        </div>
        <div className="bg-surface/80 space-y-6 rounded-3xl p-6 shadow-xs backdrop-blur-xl">
          <div>
            <h3 className="text-content-secondary mb-3 text-xs font-bold tracking-wider uppercase">
              Solid Variant
            </h3>
            <div className="flex flex-wrap gap-3">
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

          <div>
            <h3 className="text-content-secondary mb-3 text-xs font-bold tracking-wider uppercase">
              Soft Variant
            </h3>
            <div className="flex flex-wrap gap-3">
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

          <div>
            <h3 className="text-content-secondary mb-3 text-xs font-bold tracking-wider uppercase">
              Outline Variant
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button color="primary" variant="outline">
                Primary
              </Button>
              <Button color="secondary" variant="outline">
                Secondary
              </Button>
              <Button color="tertiary" variant="outline">
                Tertiary
              </Button>
              <Button color="success" variant="outline">
                Success
              </Button>
              <Button color="warning" variant="outline">
                Warning
              </Button>
              <Button color="danger" variant="outline">
                Danger
              </Button>
              <Button color="info" variant="outline">
                Info
              </Button>
              <Button color="neutral" variant="outline">
                Neutral
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function GroupsTab() {
  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <div className="pb-2">
          <h2 className="text-content-primary text-xl font-bold">Button.Group Composition</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-surface/80 space-y-4 rounded-3xl p-6 shadow-xs">
            <h3 className="text-content-primary text-sm font-bold">Standard Attached Group</h3>
            <Button.Group isAttached color="primary">
              <Button>Left</Button>
              <Button>Middle</Button>
              <Button>Right</Button>
            </Button.Group>
          </div>

          <div className="bg-surface/80 space-y-4 rounded-3xl p-6 shadow-xs">
            <h3 className="text-content-primary text-sm font-bold">Full Pill Attached Group</h3>
            <Button.Group isAttached color="neutral" radius="full" variant="outline">
              <Button>Overview</Button>
              <Button>Analytics</Button>
              <Button>Settings</Button>
            </Button.Group>
          </div>

          <div className="bg-surface/80 space-y-4 rounded-3xl p-6 shadow-xs">
            <h3 className="text-content-primary text-sm font-bold">Vertical Attached Group</h3>
            <Button.Group isAttached isVertical color="secondary" variant="soft">
              <Button>Profile</Button>
              <Button>Billing</Button>
              <Button>Logout</Button>
            </Button.Group>
          </div>

          <div className="bg-surface/80 space-y-4 rounded-3xl p-6 shadow-xs">
            <h3 className="text-content-primary text-sm font-bold">Icon-only Toolbar</h3>
            <Button.Group isAttached variant="outline">
              <Button isIconOnly aria-label="Add">
                <Plus className="size-4" />
              </Button>
              <Button isIconOnly aria-label="Search">
                <Search className="size-4" />
              </Button>
              <Button isIconOnly aria-label="Delete" color="danger">
                <Trash2 className="size-4" />
              </Button>
            </Button.Group>
          </div>
        </div>
      </section>
    </div>
  );
}

function A11yTab() {
  const [asyncLoading, setAsyncLoading] = useState(false);
  const triggerAsync = (): void => {
    setAsyncLoading(true);
    setTimeout(() => setAsyncLoading(false), 2000);
  };

  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <div className="pb-2">
          <h2 className="text-content-primary text-xl font-bold">
            Keyboard Shortcuts &amp; Async Dynamics
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="bg-surface/80 space-y-3 rounded-3xl p-6 shadow-xs">
            <h3 className="text-content-primary text-sm font-bold">Search Trigger</h3>
            <Button fullWidth className="justify-between" variant="outline">
              <div className="flex items-center gap-2">
                <Search className="text-content-muted size-4" />
                <span>Quick Search</span>
              </div>
              <Button.Shortcut>⌘K</Button.Shortcut>
            </Button>
          </div>

          <div className="bg-surface/80 space-y-3 rounded-3xl p-6 shadow-xs">
            <h3 className="text-content-primary text-sm font-bold">Primary Action</h3>
            <Button fullWidth className="justify-between" color="primary">
              <div className="flex items-center gap-2">
                <Plus className="size-4" />
                <span>New Project</span>
              </div>
              <Button.Shortcut>⌘N</Button.Shortcut>
            </Button>
          </div>

          <div className="bg-surface/80 space-y-3 rounded-3xl p-6 shadow-xs">
            <h3 className="text-content-primary text-sm font-bold">Destructive Action</h3>
            <Button fullWidth className="justify-between" color="danger" variant="soft">
              <div className="flex items-center gap-2">
                <Trash2 className="size-4" />
                <span>Delete File</span>
              </div>
              <Button.Shortcut>⌫</Button.Shortcut>
            </Button>
          </div>
        </div>

        <div className="bg-surface/80 space-y-4 rounded-3xl p-6 shadow-xs">
          <h3 className="text-content-primary text-sm font-bold">Async Loading State Simulation</h3>
          <div className="flex items-center gap-4">
            <Button
              color="success"
              isLoading={asyncLoading}
              startIcon={<Check className="size-4" />}
              onClick={triggerAsync}
            >
              {asyncLoading ? 'Saving changes...' : 'Save Configuration'}
            </Button>

            <Button endIcon={<ChevronRight className="size-4" />} variant="outline">
              Next Step
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
