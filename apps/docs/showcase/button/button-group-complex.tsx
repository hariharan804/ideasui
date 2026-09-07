'use client';

import { useState } from 'react';
import { Button } from '@ideasui/react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GitFork,
  Star,
  ThumbsUp,
  Bold,
  Italic,
  Code,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
  Download,
  Filter,
} from 'lucide-react';

export default function ButtonGroupComplex() {
  const [isStarred, setIsStarred] = useState(false);
  const [starCount, setStarCount] = useState(1240);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAlign, setActiveAlign] = useState<'left' | 'center' | 'right' | 'justify'>('left');
  const [activeFormats, setActiveFormats] = useState<string[]>(['italic', 'list']);
  const [activeWorkflow, setActiveWorkflow] = useState<'all' | 'progress' | 'completed'>('all');
  const [likes, setLikes] = useState(482);
  const [hasLiked, setHasLiked] = useState(false);

  const toggleFormat = (format: string) => {
    setActiveFormats((current) =>
      current.includes(format) ? current.filter((f) => f !== format) : [...current, format],
    );
  };

  const handleStar = () => {
    setIsStarred((prev) => {
      setStarCount((count) => (prev ? count - 1 : count + 1));

      return !prev;
    });
  };

  const handleLike = () => {
    setHasLiked((prev) => {
      setLikes((count) => (prev ? count - 1 : count + 1));

      return !prev;
    });
  };

  return (
    <div className="w-full space-y-6 py-2">
      {/* ── 1. Solid & Outline Variants (Split Actions & GitHub Counters) ── */}
      <div className="border-border/60 bg-surface/50 rounded-2xl border p-5 shadow-sm backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-content-primary text-sm font-semibold">
            Solid & Outline Group Variants
          </h4>
          <span className="border-border bg-surface-subtle text-content-secondary rounded-full border px-2.5 py-0.5 text-[11px] font-medium">
            variant=&quot;solid&quot; &amp; variant=&quot;outline&quot;
          </span>
        </div>
        <p className="text-content-secondary mb-4 text-xs">
          High-emphasis primary split buttons combined with secondary outlined action counters.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {/* Solid Split Button */}
          <Button.Group color="primary" variant="solid">
            <Button>Merge pull request</Button>
            <Button isIconOnly aria-label="More merge options">
              <ChevronDown className="size-4" />
            </Button>
          </Button.Group>

          {/* Outline Star Counter */}
          <Button.Group color="neutral" variant="outline">
            <Button
              className={isStarred ? 'bg-warning-subtle text-warning font-semibold' : ''}
              onClick={handleStar}
            >
              <Button.Icon placement="start">
                <Star className={`size-4 ${isStarred ? 'text-warning fill-current' : ''}`} />
              </Button.Icon>
              {isStarred ? 'Starred' : 'Star'}
            </Button>
            <Button aria-label="Star count">
              <span className="font-mono text-xs font-semibold">{starCount}</span>
            </Button>
          </Button.Group>

          {/* Outline Fork Group */}
          <Button.Group color="neutral" variant="outline">
            <Button>
              <Button.Icon placement="start">
                <GitFork className="size-4" />
              </Button.Icon>
              Fork
            </Button>
            <Button aria-label="Fork count">
              <span className="font-mono text-xs font-semibold">328</span>
            </Button>
          </Button.Group>

          {/* Outline Upvote Group */}
          <Button.Group color="neutral" variant="outline">
            <Button
              className={hasLiked ? 'bg-primary-subtle text-primary font-semibold' : ''}
              onClick={handleLike}
            >
              <Button.Icon placement="start">
                <ThumbsUp className={`size-4 ${hasLiked ? 'text-primary fill-current' : ''}`} />
              </Button.Icon>
              Upvote
            </Button>
            <Button aria-label="Upvote count">
              <span className="font-mono text-xs font-semibold">{likes}</span>
            </Button>
          </Button.Group>
        </div>
      </div>

      {/* ── 2. Soft Variant (Workflow & Segmented Filters) ───────────────── */}
      <div className="border-border/60 bg-surface/50 rounded-2xl border p-5 shadow-sm backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-content-primary text-sm font-semibold">Soft Group Variant</h4>
          <span className="border-border bg-surface-subtle text-content-secondary rounded-full border px-2.5 py-0.5 text-[11px] font-medium">
            variant=&quot;soft&quot;
          </span>
        </div>
        <p className="text-content-secondary mb-4 text-xs">
          Medium-emphasis soft buttons ideal for workflow tabs, filter controls, and status groups.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Button.Group color="primary" variant="soft">
            <Button
              className={activeWorkflow === 'all' ? 'bg-primary text-on-primary font-semibold' : ''}
              onClick={() => setActiveWorkflow('all')}
            >
              All Tasks (24)
            </Button>
            <Button
              className={
                activeWorkflow === 'progress' ? 'bg-primary text-on-primary font-semibold' : ''
              }
              onClick={() => setActiveWorkflow('progress')}
            >
              In Progress (8)
            </Button>
            <Button
              className={
                activeWorkflow === 'completed' ? 'bg-primary text-on-primary font-semibold' : ''
              }
              onClick={() => setActiveWorkflow('completed')}
            >
              Completed (16)
            </Button>
          </Button.Group>
        </div>
      </div>

      {/* ── 3. Ghost Variant (Minimalist Editor & Toolbars) ─────────────── */}
      <div className="border-border/60 bg-surface/50 rounded-2xl border p-5 shadow-sm backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-content-primary text-sm font-semibold">Ghost Group Variant</h4>
          <span className="border-border bg-surface-subtle text-content-secondary rounded-full border px-2.5 py-0.5 text-[11px] font-medium">
            variant=&quot;ghost&quot;
          </span>
        </div>
        <p className="text-content-secondary mb-4 text-xs">
          Border-free, subtle hover state groups designed for rich text editor bars and clean
          toolbars.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {/* History Controls */}
          <div className="border-border/60 bg-surface-subtle/40 flex items-center gap-1 rounded-xl border p-1 backdrop-blur-xs">
            <Button.Group color="neutral" isAttached={false} variant="ghost">
              <Button isIconOnly aria-label="Undo" radius="md">
                <RotateCcw className="size-4" />
              </Button>
              <Button isIconOnly aria-label="Redo" radius="md">
                <RotateCw className="size-4" />
              </Button>
            </Button.Group>
          </div>

          {/* Text Formatting Controls */}
          <div className="border-border/60 bg-surface-subtle/40 flex items-center gap-1 rounded-xl border p-1 backdrop-blur-xs">
            <Button.Group color="neutral" isAttached={false} variant="ghost">
              <Button
                isIconOnly
                aria-label="Bold"
                className={
                  activeFormats.includes('bold')
                    ? 'bg-primary-subtle text-primary font-semibold'
                    : ''
                }
                radius="md"
                onClick={() => toggleFormat('bold')}
              >
                <Bold className="size-4" />
              </Button>
              <Button
                isIconOnly
                aria-label="Italic"
                className={
                  activeFormats.includes('italic')
                    ? 'bg-primary-subtle text-primary font-semibold'
                    : ''
                }
                radius="md"
                onClick={() => toggleFormat('italic')}
              >
                <Italic className="size-4" />
              </Button>
              <Button
                isIconOnly
                aria-label="Code"
                className={
                  activeFormats.includes('code')
                    ? 'bg-primary-subtle text-primary font-semibold'
                    : ''
                }
                radius="md"
                onClick={() => toggleFormat('code')}
              >
                <Code className="size-4" />
              </Button>
              <Button
                isIconOnly
                aria-label="Bullet List"
                className={
                  activeFormats.includes('list')
                    ? 'bg-primary-subtle text-primary font-semibold'
                    : ''
                }
                radius="md"
                onClick={() => toggleFormat('list')}
              >
                <List className="size-4" />
              </Button>
            </Button.Group>
          </div>

          {/* Alignment Controls */}
          <div className="border-border/60 bg-surface-subtle/40 flex items-center gap-1 rounded-xl border p-1 backdrop-blur-xs">
            <Button.Group color="neutral" isAttached={false} variant="ghost">
              <Button
                isIconOnly
                aria-label="Align Left"
                className={
                  activeAlign === 'left' ? 'bg-primary-subtle text-primary font-semibold' : ''
                }
                radius="md"
                onClick={() => setActiveAlign('left')}
              >
                <AlignLeft className="size-4" />
              </Button>
              <Button
                isIconOnly
                aria-label="Align Center"
                className={
                  activeAlign === 'center' ? 'bg-primary-subtle text-primary font-semibold' : ''
                }
                radius="md"
                onClick={() => setActiveAlign('center')}
              >
                <AlignCenter className="size-4" />
              </Button>
              <Button
                isIconOnly
                aria-label="Align Right"
                className={
                  activeAlign === 'right' ? 'bg-primary-subtle text-primary font-semibold' : ''
                }
                radius="md"
                onClick={() => setActiveAlign('right')}
              >
                <AlignRight className="size-4" />
              </Button>
              <Button
                isIconOnly
                aria-label="Justify"
                className={
                  activeAlign === 'justify' ? 'bg-primary-subtle text-primary font-semibold' : ''
                }
                radius="md"
                onClick={() => setActiveAlign('justify')}
              >
                <AlignJustify className="size-4" />
              </Button>
            </Button.Group>
          </div>
        </div>
      </div>

      {/* ── 4. Surface Variant (Embedded Media & Table Controls) ─────────── */}
      <div className="border-border/60 bg-surface/50 rounded-2xl border p-5 shadow-sm backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-content-primary text-sm font-semibold">Surface Group Variant</h4>
          <span className="border-border bg-surface-subtle text-content-secondary rounded-full border px-2.5 py-0.5 text-[11px] font-medium">
            variant=&quot;surface&quot;
          </span>
        </div>
        <p className="text-content-secondary mb-4 text-xs">
          Muted surface background container ideal for table actions, media transport, and
          pagination.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Table Actions Group */}
          <Button.Group color="neutral" variant="surface">
            <Button>
              <Button.Icon placement="start">
                <Filter className="size-4" />
              </Button.Icon>
              Filter
            </Button>
            <Button>
              <Button.Icon placement="start">
                <Download className="size-4" />
              </Button.Icon>
              Export
            </Button>
          </Button.Group>

          {/* Media Player Transport Group */}
          <Button.Group color="secondary" variant="surface">
            <Button isIconOnly aria-label="Previous track">
              <SkipBack className="size-4" />
            </Button>
            <Button color="secondary" variant="solid" onClick={() => setIsPlaying(!isPlaying)}>
              <Button.Icon placement="start">
                {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
              </Button.Icon>
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button isIconOnly aria-label="Next track">
              <SkipForward className="size-4" />
            </Button>
          </Button.Group>

          {/* Pagination Controls */}
          <Button.Group color="neutral" variant="surface">
            <Button>
              <Button.Icon placement="start">
                <ChevronLeft className="size-4" />
              </Button.Icon>
              Prev
            </Button>
            <Button aria-label="Current page">Page 3 of 12</Button>
            <Button>
              Next
              <Button.Icon placement="end">
                <ChevronRight className="size-4" />
              </Button.Icon>
            </Button>
          </Button.Group>
        </div>
      </div>
    </div>
  );
}
