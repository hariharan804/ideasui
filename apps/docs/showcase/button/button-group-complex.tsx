'use client';

import { Button } from '@ideasui/react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GitFork,
  Image,
  Video,
  MoreHorizontal,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ThumbsUp,
  ThumbsDown,
  Star,
  QrCode,
} from 'lucide-react';

export default function ButtonGroupComplex() {
  return (
    <div className="flex flex-col items-start gap-8">
      {/* Primary Action with Dropdown trigger */}
      <div className="flex flex-col gap-2">
        <span className="text-content-secondary text-xs font-semibold tracking-wider uppercase">
          Primary Split Action
        </span>
        <Button.Group color="primary" variant="solid">
          <Button>Merge pull request</Button>
          <Button isIconOnly aria-label="More merge options">
            <ChevronDown className="size-4" />
          </Button>
        </Button.Group>
      </div>

      {/* GitHub style secondary actions with faux badges */}
      <div className="flex flex-col gap-2">
        <span className="text-content-secondary text-xs font-semibold tracking-wider uppercase">
          Counters & Utilities
        </span>
        <div className="flex flex-wrap gap-3">
          <Button.Group color="neutral" variant="outline">
            <Button>
              <Button.Icon placement="start">
                <GitFork className="size-4" />
              </Button.Icon>
              Fork
            </Button>
            <Button className="bg-surface-muted/30 text-content-secondary px-3 font-mono text-xs font-bold">
              24
            </Button>
          </Button.Group>

          <Button.Group color="neutral" variant="outline">
            <Button isIconOnly aria-label="Scan QR">
              <QrCode className="size-4" />
            </Button>
            <Button>Scan to pay</Button>
          </Button.Group>

          <Button.Group color="neutral" variant="outline">
            <Button>
              <Button.Icon placement="start">
                <ThumbsUp className="size-4" />
              </Button.Icon>
              <span className="text-content-primary font-semibold">2.4K</span>
            </Button>
            <Button isIconOnly aria-label="Thumbs down">
              <ThumbsDown className="size-4" />
            </Button>
          </Button.Group>

          <Button.Group color="neutral" variant="outline">
            <Button>
              <Button.Icon placement="start">
                <Star className="size-4" />
              </Button.Icon>
              Star
            </Button>
            <Button className="bg-surface-muted/30 text-content-secondary px-3 font-mono text-xs font-bold">
              104
            </Button>
          </Button.Group>
        </div>
      </div>

      {/* Previous/Next */}
      <div className="flex flex-col gap-2">
        <span className="text-content-secondary text-xs font-semibold tracking-wider uppercase">
          Pagination Navigation
        </span>
        <Button.Group color="neutral" variant="outline">
          <Button>
            <Button.Icon placement="start">
              <ChevronLeft className="size-4" />
            </Button.Icon>
            Previous
          </Button>
          <Button>
            <Button.Icon placement="end">
              <ChevronRight className="size-4" />
            </Button.Icon>
            Next
          </Button>
        </Button.Group>
      </div>

      {/* Content Selection Toolbars */}
      <div className="flex flex-col gap-2">
        <span className="text-content-secondary text-xs font-semibold tracking-wider uppercase">
          Media Selection
        </span>
        <Button.Group color="neutral" variant="outline">
          <Button>
            <Button.Icon placement="start">
              <Image className="size-4" />
            </Button.Icon>
            Photos
          </Button>
          <Button>
            <Button.Icon placement="start">
              <Video className="size-4" />
            </Button.Icon>
            Videos
          </Button>
          <Button isIconOnly aria-label="More options">
            <MoreHorizontal className="size-4" />
          </Button>
        </Button.Group>
      </div>

      {/* Text Alignment */}
      <div className="flex flex-col gap-2">
        <span className="text-content-secondary text-xs font-semibold tracking-wider uppercase">
          Rich Text Toolbars
        </span>
        <div className="flex flex-wrap gap-4">
          <Button.Group color="neutral" variant="outline">
            <Button>Left</Button>
            <Button>Center</Button>
            <Button>Right</Button>
          </Button.Group>

          <Button.Group isIconOnly color="neutral" variant="outline">
            <Button aria-label="Align Left">
              <AlignLeft className="size-4" />
            </Button>
            <Button aria-label="Align Center">
              <AlignCenter className="size-4" />
            </Button>
            <Button aria-label="Align Right">
              <AlignRight className="size-4" />
            </Button>
            <Button aria-label="Justify">
              <AlignJustify className="size-4" />
            </Button>
          </Button.Group>
        </div>
      </div>
    </div>
  );
}
